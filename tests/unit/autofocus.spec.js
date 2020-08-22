import Vue from 'vue'
import { mount } from '@vue/test-utils'

import autofocus from '@/../dist/directives.esm'
import AutofocusMock from './autofocus.mock.vue'


Vue.use(autofocus)

const container = document.createElement('div')
container.id = 'container'


describe('v-autofocus', () => {
    let wrapper

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function validateFocused(focusedId, options, focused = true) {
        document.body.appendChild(container)
        wrapper = mount(AutofocusMock, {
            attachTo: container,
            propsData: {
                focusedId,
                options,
            }
        })

        await delay(100)
        const target = wrapper.element.querySelector(`#${focusedId}`)

        if (target && focused) {
            expect(target).to.equal(document.activeElement)
        } else {
            expect(! document.activeElement || document.activeElement === document.body).to.be.ok
        }

        wrapper.destroy()
    }


    it('uses defaults on <button v-autofocus="...">', async () => {
        await validateFocused('options')
        await validateFocused('options', {})
    })

    it('respects enabled on <button v-autofocus="...">', async () => {
        await validateFocused('options', { enabled: true })
        await validateFocused('options', true)
        await validateFocused('options', { enabled: false }, false)
        await validateFocused('options', false, false)
    })

    it('respects selector on <button v-autofocus="...">', async () => {
        await validateFocused('options', { selector: 'button' })
        await validateFocused('options', 'button')
        await validateFocused('options', { selector: 'input' }, false)
        await validateFocused('options', 'input', false)
    })

    it('respects delay on <button v-autofocus="...">', async () => {
        await validateFocused('options', { delay: 0 })
        await validateFocused('options', 0)
        await validateFocused('options', { delay: 200 }, false)
        await validateFocused('options', 200, false)
    })

    it('focuses on input elements', async () => {
        await validateFocused('input-input')
        await validateFocused('input-textarea')
        await validateFocused('input-button')
        await validateFocused('input-select')
    })

    it('focuses on contenteditable elements', async () => {
        await validateFocused('editable-span')
        await validateFocused('editable-div')
    })

    it('focuses on the first focusable element inside a <div>', async () => {
        await validateFocused('first-focusable')
    })

    it('focuses on the first matching focusable element inside a <div>', async () => {
        await validateFocused('first-matching', 'div .focus-me')
    })

    it('focuses on <body> or nothing if no matching element inside a <div>', async () => {
        await validateFocused('first-matching', '.no-such-class', false)
    })

    it('does not focus on unfocusable elements', async () => {
        await validateFocused('unfocusable', {}, false)
    })

    it('focuses on <body> or nothing if no v-autofocus', async () => {
        await validateFocused('no-autofocus', {},false)
    })
})
