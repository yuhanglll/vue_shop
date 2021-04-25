import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './plugins/element.js'
/*导入字体图标*/
import './assets/fonts/iconfont.css'
/*倒入全局样式表*/
import './assets/css/global.css'
import axios from "axios";
import TreeTable from 'vue-table-with-tree-grid'

/*配置请求的根路径*/
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
/*请求需要权限的api(除登录接口的api)  需要在请求头中注入token*/
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
