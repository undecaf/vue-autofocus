const defaults = {
    enabled: true,      // if true then focus will be set when the element is inserted
    selector: '*',      // focusable elements must match this in order to get focus
    delay: 50,          // delay (in ms) until focus is set after the element was inserted
}

const autofocus = {
    install(Vue) {
        Vue.directive('autofocus', autofocus)
    },

    inserted(el, binding) {
        let options

        function canFocus(element) {
            element.focus && element.focus()
            return (document.activeElement === element)
        }

        function doFocus() {
            if (!el.matches(options.selector) || !canFocus(el)) {
                for (let e of el.querySelectorAll(options.selector)) {
                    if (canFocus(e)) {
                        return
                    }
                }
            }
        }

        // Process directive value
        const value = binding.value
        if (typeof value === 'undefined') {
            options = defaults

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

        // Autofocus enabled?
        if (options.enabled) {
            if (options.delay <= 0) {
                doFocus()
            } else {
                setTimeout(doFocus, options.delay)
            }
        }
    },
}

export default autofocus
