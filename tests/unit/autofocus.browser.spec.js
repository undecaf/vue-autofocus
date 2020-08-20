import Vue from 'vue'


Vue.config.productionTip = false
Vue.config.devtools = false

window.Vue = Vue
import('@/../dist/directives.min')


describe('v-autofocus (Browser)', () => {
    it('is registered as Vue directive', () => {
        expect(Vue.options.directives.autofocus).to.be.an('object')
    })
})
