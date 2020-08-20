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

    async function validateFocused(focusedId, focused = true) {
        document.body.appendChild(container)
        wrapper = mount(AutofocusMock, {
            attachTo: container,
            propsData: {
                focusedId,
            }
        })

        await delay(100)
        const target = wrapper.get(`#${focusedId || 'none'}`)

        if (focused) {
            expect(target.element).to.equal(document.activeElement)
        } else {
            expect(! document.activeElement || document.activeElement === document.body).to.be.ok
        }

        return target
    }

    afterEach(() => {
        wrapper.destroy()
    })


    it('focuses on <input v-autofocus>', async () => {
        await validateFocused()
    })

    it('focuses on <input v-autofocus="true">', async () => {
        await validateFocused('input')
    })

    it('focuses on <button v-autofocus="true">', async () => {
        await validateFocused('button')
    })

    it('focuses on <textarea v-autofocus="true">', async () => {
        await validateFocused('textarea')
    })

    it('focuses on <select v-autofocus="true">', async () => {
        await validateFocused('select')
    })

    it('focuses on the first focusable element inside a <div v-autofocus="true">', async () => {
        await validateFocused('first-focusable')
    })

    it('focuses on <body> or nothing if no v-autofocus', async () => {
        await validateFocused('no-autofocus', false)
    })

    it('does not focus on empty <div v-autofocus="true">', async () => {
        await validateFocused('empty', false)
    })
})
