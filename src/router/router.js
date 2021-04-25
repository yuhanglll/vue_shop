import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'
import Welcome from "@/components/Welcome";
import Users from "@/components/user/Users";
import Rights from "@/components/power/Rights";
import Roles from "@/components/power/Roles";
import Cate from "@/components/goods/Cate"
import Params from "@/components/goods/Params";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {
            path: '/home', component: Home, redirect: '/welcome', children: [
                {path: '/welcome', component: Welcome},
                {path: '/users', component: Users},
                {path: '/rights', component: Rights},
                {path: '/roles', component: Roles},
                {path: '/categories', component: Cate},
                {path: '/params', component: Params}
            ]
        }
    ]
})
//路由导航守卫 还存在恶意更改token的问题 应该要加判断token是否和登录时的token相等！！
router.beforeEach((to, from, next) => {
    //to 将要访问的路径 fom从哪个路径跳转而来 next表示放行
    if (to.path === '/login') return next()
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router
