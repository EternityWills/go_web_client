import { IApp } from "@/config/app";
import { ITools } from "@/utils/Tools"
import { IFnLpk } from "@/config/lpk";

declare global {
    declare namespace GlobalType {
        type Ikey = string | number;
        type IRecord = Record<Ikey, any>
    }

    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk

    interface Window {
        app: IApp;//全局app对象，挂载全局数据与方法
        Tools: ITools;//全局工具库对象，包含一些公用方法
        lpk: IFnLpk;//全局语言包支持函数
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp;
        Tools: ITools;
        lpk: IFnLpk;
    }
}