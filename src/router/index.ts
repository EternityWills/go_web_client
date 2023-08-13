import { get } from 'lodash'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router"
import Index from '@/views/Index/index.vue'
import { ROUTER_VIEW_KEY, LOGIN_PATH } from "@/utils/Constants"

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
                requireAuth: false,
                hostRouterViewKey: ROUTER_VIEW_KEY.Index
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
        { path: LOGIN_PATH, name: 'login', component: () => import("@/views/Login/Login.vue"), meta: { title: lpk('page.login.Title'), requireAuth: false } },
        { path: '/regist', name: 'regist', component: () => import("@/views/Login/Regist.vue"), meta: { title: lpk('page.regist.Title'), requireAuth: false } },
    ]

    //聚合业务模块路由信息
    routes = routes.concat(app.getAllBModRoutes())
    routes.push({ path: '/:pathMatch(.*)', name: 'notfound', component: () => import("@/views/NotFound.vue") })
    giAllRoutes = routes

    //收集所有宿主RouterView对应的各业务模块注册的子路由
    gatherBelongToRoute()

    const iRouter = createRouter({
        history: createWebHistory(),
        routes
    })

    iRouter.beforeEach((to, from, next) => {
        const stLoninUserId = get(app.getAppCtl().getLoginUser(), 'id', '')
        if (!stLoninUserId && to.matched.some(record => false !== get(record, 'meta.requireAuth', true))) {
            next({
                path: LOGIN_PATH,
                query: {
                    redirect: to.fullPath
                }
            })
            return
        }

        //已登录时返回主界面
        if (stLoninUserId && to.path == LOGIN_PATH) {
            next('/')
            return
        }

        next()

    })

    iRouter.afterEach((to, from) => {
        const title = get(to, 'meta.title', '')
        title && (document.title = title)
    })
    return iRouter
}

//收集所有宿主RouterView对应的各业务模块注册的子路由
const gatherBelongToRoute = () => {
    const _Do = (hostRoute: RouteRecordRawExt, giRoutes: RouteRecordRawExt[]) => {
        const stHoldRouterViewKey = get(hostRoute, 'meta.hostRouterViewKey')
        if (!stHoldRouterViewKey || !giRoutes.length) {
            return
        }

        for (let i = 0; i < giRoutes.length;) {
            const iFindItem = giRoutes[i]
            // 宿主路由为将要查找路由数组中的一员, 则停止查找
            if (hostRoute == iFindItem) {
                i++
                continue;
            }

            if (stHoldRouterViewKey == get(iFindItem, 'meta.belongToRouterViewKey')) {
                hostRoute.children = hostRoute.children || []
                hostRoute.children.push(iFindItem)
                giRoutes.splice(i, 1)
            } else {
                iFindItem.children && (_Do(hostRoute, iFindItem.children))
                i++
            }
        }
    }

    giAllRoutes.map(item => _Do(item, giAllRoutes))
}
