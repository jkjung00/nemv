import '@babel/polyfill'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
