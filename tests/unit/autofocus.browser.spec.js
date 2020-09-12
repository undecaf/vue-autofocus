import Vue from 'vue'


Vue.config.productionTip = false
Vue.config.devtools = false


describe('v-autofocus (Browser)', () => {

    before(async () => {
        // Make Vue visible in the browser context
        window.Vue = Vue
        await import('@/../dist/directives.min')
    })

    it('is registered as Vue directive', () => {
        expect(Vue.options.directives.autofocus).to.be.an('object')
    })
})
