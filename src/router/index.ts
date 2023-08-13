import { get } from 'lodash'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router"
import Index from '@/views/Index/index.vue'

type RouteRecordRawExt = RouteRecordRaw & { children?: RouteRecordRawExt[] }

let giAllRoutes: RouteRecordRawExt[] = []
export const initRouter: () => Router = () => {
    let routes: RouteRecordRawExt[] = [
        { path: '/', redirect: '/index' },
        {
            path: '/index',
            name: 'index',
            component: Index,
            meta: {
                title: lpk('page.index.Title'),
                requireAuth: false
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import("@/views/Index/Home.vue"),
                    meta: {
                        requireAuth: false
                    }
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/views/My/My.vue'),
                    meta: {
                        title: lpk('page.my.Title'),
                    }
                }
            ]
        },
        { path: '/login', name: 'login', component: () => import("@/views/Login/Login.vue"), meta: { title: lpk('page.login.Title'), requireAuth: false } },
        { path: '/regist', name: 'regist', component: () => import("@/views/Login/Regist.vue"), meta: { title: lpk('page.regist.Title'), requireAuth: false } },
    ]

    //聚合业务模块路由信息
    routes = routes.concat(app.getAllBModRoutes())
    routes.push({ path: '/:pathMatch(.*)', name: 'notfound', component: () => import("@/views/NotFound.vue") })
    console.log(routes)

    const iRouter = createRouter({
        history: createWebHistory(),
        routes
    })

    iRouter.afterEach((to, from) => {
        const title = get(to, 'meta.title', '')
        title && (document.title = title)
    })
    return iRouter
}