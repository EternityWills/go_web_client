import { IApp } from "@/config/app";
import { ITools } from "@/utils/Tools"

declare global {
    declare namespace GlobalType {
        type Ikey = string | number;
        type IRecord = Record<Ikey, any>
    }

    const app: IApp
    const Tools: ITools

    interface Window {
        app: IApp;//全局app对象，挂载全局数据与方法
        Tools: ITools;//全局工具库对象，包含一些公用方法
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp;
        Tools: ITools;
    }
}