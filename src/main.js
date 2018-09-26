// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'   //引入ElementUI
import 'element-ui/lib/theme-chalk/index.css'//引入css
import axios from 'axios'

//axios.defaults.baseURL="https://wd8041554674gwfcto.wilddogio.com"

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
