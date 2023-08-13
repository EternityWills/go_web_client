import syscfg from "./config/syscfg"
import { initRoutes } from "./router"
const stModulName = syscfg.module

//业务模块入口
export const entryInit = async () => {
    //判断开启的业务模块
    if (!app.checkBmodIsEnable(stModulName)) {
        return
    }

    //初始化当前模块语言包
    app.getAppCtl().mergeLpk(import.meta.glob('./locales/*', { eager: true }))

    //初始化当前模块配置信息

    //初始化当前模块的状态管理

    //初始化当前模块路由
    initRoutes()
}

export default {

}