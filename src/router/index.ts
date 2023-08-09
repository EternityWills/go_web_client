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
        }
    ]

    const iRouter = createRouter({
        history: createWebHistory(),
        routes
    })
    return iRouter
}