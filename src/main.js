import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store/store.js'
import fastclick from 'fastclick'
import 'style/common.scss'
import 'style/reset.scss'
import 'font/iconfont.css'
import lazy from 'vue-lazyload'

Vue.use(lazy,{
  loading: require('img/loading.png')
})
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
