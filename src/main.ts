import { createApp } from 'vue'
import App from './App.vue'
import { ininApp, initGlobalComponents } from '@/config/init'
import { initRouter } from './router'

import './assets/styles/base-theme.scss'
import './assets/styles/blue-theme.scss'
import './assets/styles/black-theme.scss'

import 'normalize.css/normalize.css'
import './assets/fonts/iconfont.css'
import './assets/styles/global.scss'

(async () => {
    /*初始化系统基础配置信息（保证模块加载完成后，再创建UI）
        1.全局变量(app),语言包(lpk),Ajax,Tools的定义
        Ajax封装：
            1.通过任务队列解决基于XHR异步请求产生的回调地狱问题
            2.基于Axios库实现Ajax封装
            3.在封装好的Aiax库的基础上实现BaseAPI的封装，将一些通用的WebApi请求封装
            4.在封装好的BaseApi基础上实现各模块WebApi调用
            6.Mock数据处理
        2.异步加载基础模块的配置信息
            加载系统当前状态信息
            加载当前登录用户的个人信息
        3.异步加载业务模块，并完成基本初始化
    */
    await ininApp()
    //初始化UI
    const uiApp = createApp(App)


    //注册全局组件
    initGlobalComponents(uiApp)

    //向根组件绑定全局对象
    uiApp.config.globalProperties.app = window.app
    uiApp.config.globalProperties.Tools = window.Tools
    uiApp.config.globalProperties.lpk = window.lpk

    app.getAppCtl
    //初始化状态管理与路由，并渲染根组件
    //初始化基础模块
    //初始各业务模块的路由配置
    //对路由守卫进行处理
    //Keep-alive的使用

    uiApp.use(initRouter()).mount('#app')
})()
