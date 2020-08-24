import Vue from "vue"
import VueMaterial from 'vue-material'
import autofocus from '@/../dist/directives.esm'
import Test from "@/components/Test.vue"
import "@/main.css"


Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(autofocus)


new Vue({
    el: "#app",
    render: h => h(Test),
})
