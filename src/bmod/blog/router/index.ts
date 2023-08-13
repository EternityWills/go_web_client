import syscfg from "../config/syscfg"
import type { RouteRecordRaw } from "vue-router"

export const initRoutes = () => {
    const stPath = `/${syscfg.module}`

    //定义当前模块对应的路由信息
    const giRoutes: RouteRecordRaw[] = [{
        name: `${syscfg.module}Index`,
        path: stPath,
        meta: {
            title: lpk('blog'),
            requireAuth: false,
        },
        component: () => import('../views/Index/Index.vue')
    },
    {
        name: 'articleDetail',
        path: `${stPath}/article/detail/:id`,
        meta: {
            title: '',
            requireAuth: false,
        },
        component: () => import('../views/article/Detail/articleDetail.vue')
    }, {
        name: 'editArticle',
        path: `${stPath}/edit`,
        meta: {
            title: lpk('page.biog.article.edit'),
        },
        component: () => import('../views/article/Edit/EditArticle.vue')
    }]

    app.registBModRouter(giRoutes)

} 