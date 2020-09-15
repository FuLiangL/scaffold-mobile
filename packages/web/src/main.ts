import 'amfe-flexible'
import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
// import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
