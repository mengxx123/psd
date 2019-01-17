import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Viewer = resolve => require(['@/views/Viewer'], resolve)
const ViewerHelp = resolve => require(['@/views/ViewerHelp'], resolve)
const Viewer2 = resolve => require(['@/views/Viewer2'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/viewer',
        component: Viewer
    },
    {
        path: '/viewer/v1',
        component: Viewer
    },
    {
        path: '/viewer',
        component: Viewer2
    },
    {
        path: '/viewer/help',
        component: ViewerHelp
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
