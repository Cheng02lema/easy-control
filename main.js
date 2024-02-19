import Vue from 'vue'
import App from './App'
// import http from './api/http'
// import '@/filters/filter.js'

import store from '@/store' //从第二步文件夹中引入的store,后面没写/index.js是因为默认进入index.js
Vue.prototype.$store = store //将store挂载到vue原型上

// Vue.prototype.$baseUrl=http.config.baseUrl

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
