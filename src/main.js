import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/styles.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(require('vue-faker'))

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
