/*

The MIT License (MIT)

Copyright (c) 2020-present Ferdinand Kasper <fkasper@modus-operandi.at>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

const defaults = {
    on: [],             // child event(s) on which to trigger the autofocus action
    enabled: true,      // enables the function of the directive if truthy
    selector: '*',      // only an element matching this selector can receive the focus
    delay: 50,          // delay (in ms) until focus is set after the trigger event
}

function setOptions(el, binding, vnode) {
    let options

    // Process directive value
    const value = binding.value

    if (typeof value === 'undefined') {
        options = defaults

    } else if (Array.isArray(value)) {
        options = Object.assign({}, defaults, { on: value.map(ev => String(ev)) })

    } else if (value && typeof value === 'object') {
        Object.keys(value).forEach(opt => {
            if (typeof defaults[opt] === 'undefined') {
                throw `Unknown option '${opt}'; known options: ${Object.keys(defaults).join(', ')}`
            }
        })
        options = Object.assign({}, defaults, value)

    } else if (typeof value === 'string') {
        options = Object.assign({}, defaults, { selector: value })

    } else if (typeof value === 'boolean') {
        options = Object.assign({}, defaults, { enabled: value })

    } else if (typeof value === 'number') {
        options = Object.assign({}, defaults, { delay: value })
    }

    // Install event handlers
    if (typeof options.on === 'string') {
        options.on = [options.on]
    }

    vnode.context.$on(options.on, focus.bind(this, el, vnode))

    vnode.$autofocus = options
}

function focus(el, vnode) {
    const options = vnode.$autofocus

    function scan() {
        function canFocus(element) {
            element.focus && element.focus()
            return (document.activeElement === element)
        }

        if (!el.matches(options.selector) || !canFocus(el)) {
            for (let e of el.querySelectorAll(options.selector)) {
                if (canFocus(e)) {
                    return
                }
            }
        }
    }

    if (options.enabled) {
        if (options.delay <= 0) {
            // Set the focus synchronously with the trigger event
            scan()
        } else {
            setTimeout(scan, options.delay)
        }
    }
}

// Deep object comparison
function equals(val1, val2) {
    function size(val) {
        return (val && typeof val === 'object') ? Object.keys(val).length : -1
    }

    if (val1 instanceof Function) {
        // Compare the source code
        return (val2 instanceof Function) && (val1.toString() === val2.toString())

    }

    const size1 = size(val1)

    if (size1 < 0) {
        // At least one non-object, requires strict equality
        return val1 === val2

    } else if (size(val2) !== size1) {
        // Two objects/arrays with differing numbers of properties/elements
        return false

    } else if (Array.isArray(val1)) {
        // At least one array, requires array comparison
        return Array.isArray(val2) && val1.every((el, index) => equals(el, val2[index]))

    } else {
        // Two objects with the same number of properties
        return Object.keys(val1).every(k => equals(val1[k], val2[k]))
    }
}

function cleanup(vnode) {
    if (vnode.$autofocus) {
        vnode.context.$off(vnode.$autofocus.on.filter(ev => ev !== self))
        delete vnode.$autofocus
    }
}


const autofocus = {
    install(Vue) {
        Vue.directive('autofocus', autofocus)
    },

    bind(el, binding, vnode) {
        setOptions(el, binding, vnode)
    },

    inserted(el, binding, vnode) {
        focus(el, vnode)
    },

    update(el, binding, vnode, oldVnode) {
        if (vnode !== oldVnode) {
            if (equals(binding.value, binding.oldValue)) {
                // Options unchanged, just move them
                vnode.$autofocus = oldVnode.$autofocus

            } else {
                // Regenerate options
                cleanup(oldVnode)
                setOptions(el, binding, vnode)
            }
        }
    },

    unbind(el, binding, vnode) {
        cleanup(vnode)
    },
}

export default autofocus
