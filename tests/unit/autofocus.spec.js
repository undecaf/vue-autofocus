import Vue from 'vue'
import { MdDialog } from 'vue-material/dist/components'
import { mount } from '@vue/test-utils'

import autofocus from '@/..'
import AutofocusMock from './autofocus.mock.vue'


Vue.use(MdDialog)
Vue.use(autofocus)

const container = document.createElement('div')
container.id = 'container'


describe('v-autofocus', () => {
    let wrapper

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function validateId(focusedId, options, expectFocused = true) {
        cleanup()

        document.body.appendChild(container)
        wrapper = mount(AutofocusMock, {
            attachTo: container,
            propsData: {
                focusedId,
                options,
            },
            stubs: {
                transition: (() => ({ render(h) { return this.$options._renderChildren } }))(),
            },
        })

        await validateSelector(`#${focusedId}`, expectFocused)
    }

    async function validateSelector(selector, expectFocused = true) {
        await delay(100)
        const target = wrapper.element.querySelector(selector)

        if (target && expectFocused) {
            expect(target).to.equal(document.activeElement)
        } else {
            expect(! document.activeElement || document.activeElement === document.body).to.be.ok
        }
    }

    function cleanup() {
        if (wrapper) {
            wrapper.destroy()
            wrapper = null
        }
    }

    afterEach(cleanup)


/*
    This fails with "Cannot read property 'propsData' of undefined"
    Regrettably, https://vue-test-utils.vuejs.org/guides/#common-tips does not help
    This kind of failure occurs if wrapper.setProps() or wrapper.setData() was called
    or if a property or data was set implicitly.

    it('focuses on the first focusable element inside an initially active <md-dialog>', async () => {
        await validateId('dialog', {})
    })

    <md-dialog v-autofocus> is now being tested by E2E tests.
*/

    it('uses defaults on <button v-autofocus="...">', async () => {
        await validateId('options')
        await validateId('options', {})
    })

    it('respects enabled on <button v-autofocus="...">', async () => {
        await validateId('options', { enabled: true })
        await validateId('options', true)
        await validateId('options', { enabled: false }, false)
        await validateId('options', false, false)
    })

    it('respects selector on <button v-autofocus="...">', async () => {
        await validateId('options', { selector: 'button' })
        await validateId('options', 'button')
        await validateId('options', { selector: 'input' }, false)
        await validateId('options', 'input', false)
    })

    it('respects delay on <button v-autofocus="...">', async () => {
        await validateId('options', { delay: 0 })
        await validateId('options', 0)
        await validateId('options', { delay: 200 }, false)
        await validateId('options', 200, false)
    })

    it('focuses on input elements', async () => {
        await validateId('input-input')
        await validateId('input-textarea')
        await validateId('input-button')
        await validateId('input-select')
    })

    it('focuses on contenteditable elements', async () => {
        await validateId('editable-span')
        await validateId('editable-div')
    })

    it('focuses on the first focusable element inside a <div>', async () => {
        await validateId('first-focusable')
    })

    it('focuses on the first matching focusable element inside a <div>', async () => {
        await validateId('first-matching', 'div .first')
    })

    it('detects property changes on a <div> and acts on child events', async () => {
        await validateId('first-matching', 'div .first')
        await wrapper.setProps({ options: { selector: '.another', on: 'hook:updated' } })
        await validateSelector('.another')
    })

    it('focuses on <body> or nothing if no matching element inside a <div>', async () => {
        await validateId('first-matching', '.no-such-class', false)
    })

    it('does not focus on unfocusable elements', async () => {
        await validateId('unfocusable', {}, false)
    })

    it('does not focus on anything focusable inside an initially inactive <md-dialog>', async () => {
        await validateId('inactive-dialog', {}, false)
    })

    it('focuses on <body> or nothing if no v-autofocus', async () => {
        await validateId('no-autofocus', {},false)
    })
})
