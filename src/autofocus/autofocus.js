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
            cleanup(oldVnode)
        }

        setOptions(el, binding, vnode)
    },

    unbind(el, binding, vnode) {
        cleanup(vnode)
    },
}

export default autofocus
