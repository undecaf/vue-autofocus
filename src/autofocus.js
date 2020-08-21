// There are container components that manipulate the focus
// _after_ their children have been inserted, therefore:
const focusDelay = 50

const autofocus = {
    install(Vue) {
        Vue.directive('autofocus', autofocus)
    },

    inserted(el, binding) {
        let selector

        function canFocus(element) {
            element.focus && element.focus()
            return (document.activeElement === element)
        }

        function doFocus() {
            if (selector !== '*' || !canFocus(el)) {
                for (let e of el.querySelectorAll(selector)) {
                    if (canFocus(e)) {
                        return
                    }
                }
            }
        }

        // Autofocus enabled?
        if ((typeof binding.value === 'undefined') || binding.value) {
            selector = (typeof binding.value === 'string') ? binding.value : '*'
            setTimeout(doFocus, focusDelay)
        }
    },
}

export default autofocus
