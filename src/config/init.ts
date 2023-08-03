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
    //加载基础平台的语言包
    initLpk()
    //初始化各个业务模块
    const IAllEntry: GlobalType.IRecord = import.meta.glob('@/bmod/*/entry.ts', { eager: true })
    for (const path in IAllEntry) {
        const iEntryFile = IAllEntry[path]
        iEntryFile && iEntryFile.entryInit && await iEntryFile.entryInit()
    }
}