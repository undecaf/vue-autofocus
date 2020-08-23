import Vue from "vue"
import VueMaterial from 'vue-material'
import autofocus from '@/../dist/directives.esm'
import App from "@/components/App.vue"
import "@/main.css"


Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(autofocus)


new Vue({
    el: "#app",
    render: h => h(App),
})