// There are container components that manipulate the focus
// _after_ their children have been inserted, therefore:
const focusDelay = 50

const autofocus = {
    install(Vue) {
        Vue.directive('autofocus', autofocus)
    },

    inserted(el, binding) {
        function canFocus(element) {
            element.focus && element.focus()
            return (document.activeElement === element)
        }

        // Autofocus enabled?
        if ((typeof binding.value === 'undefined') || binding.value) {
            setTimeout(() => {
                if (!canFocus(el)) {
                    for (let e of el.querySelectorAll('*')) {
                        if (canFocus(e)) {
                            return
                        }
                    }
                }

            }, focusDelay)
        }
    },
}

export default autofocus
