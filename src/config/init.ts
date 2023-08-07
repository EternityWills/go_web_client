import { App } from 'vue'
import app from './app'
import Tools from "@/utils/Tools"
import { initLoginUserInfo } from '@/controller/AppCtl'
import { lpk, initLpk } from './lpk'

//声明全局变量相关的类型
type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IIGlobalVars = {
    [key in IGlobalVarsKey]?: any
}

const iGlobalVars: IIGlobalVars = {
    app, //全局应用对象
    Tools,//全局工具库对象，包含一些公用方法
    lpk,//全局语言包支持函数
}

Object.keys(iGlobalVars).forEach(stkey => {
    (window as any)[stkey as IGlobalVarsKey] = iGlobalVars[stkey as IGlobalVarsKey]
});

export const ininApp = async () => {
    //初始基础业务相关的信息
    await initLoginUserInfo()

    //主题定制


    //加载基础平台的语言包
    initLpk()
    //初始化各个业务模块
    const IAllEntry: GlobalType.IRecord = import.meta.glob('@/bmod/*/entry.ts', { eager: true })
    for (const path in IAllEntry) {
        const iEntryFile = IAllEntry[path]
        iEntryFile && iEntryFile.entryInit && await iEntryFile.entryInit()
    }
}

//注册全局组件
export const initGlobalComponents = (uiApp: App<Element>) => {
    const iAllGlobalComponents: GlobalType.IRecord = import.meta.glob('@/components/*/src/*.vue', { eager: true })
    Object.keys(iAllGlobalComponents).map((path: string) => {
        const paths = path.split('/')
        const stCmpName = paths[paths.length - 3]
        uiApp.component(stCmpName, iAllGlobalComponents[path].default)
    })
}