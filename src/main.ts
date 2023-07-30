import { createApp } from 'vue'
import App from './App.vue'
import { ininApp } from '@/config/init'

import 'normalize.css/normalize.css'
import './assets/fonts/iconfont.css'
import './assets/styles/global.scss'

(async () => {
    /*初始化系统基础配置信息（保证模块加载完成后，再创建UI）
        1.全局变量(app),语言包(lpk),Ajax,Tools的定义
        2.异步加载基础模块的配置信息
        3.异步加载业务模块，并完成基本初始化
    */
    ininApp()
    //初始化UI
    const uiApp = createApp(App)


    //注册全局组件


    //向根组件绑定全局对象
    uiApp.config.globalProperties.app = window.app
    uiApp.config.globalProperties.Tools = window.Tools

    //初始化状态管理与路由，并渲染根组件

    uiApp.mount('#app')
})()
