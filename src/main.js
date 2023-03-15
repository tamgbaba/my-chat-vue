import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from '@/router'
import store from '@/store'
import http from '@/utils/request'
import { VueJsonp } from 'vue-jsonp' 
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false


// 挂载全局
Vue.prototype.$http = http

Vue.use(VueJsonp)
Vue.use(Element, {
  size: 'default',
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
