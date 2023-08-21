import { IApp } from "@/config/app";
import { ITools } from "@/utils/Tools"
import { IFnLpk } from "@/config/lpk";
import { Icon } from "@/components/Icon";
import type { IAjax, IResponse } from "@/utils/Request";


declare global {
    declare namespace GlobalType {
        type Ikey = string | number;
        type IRecord = Record<Ikey, any>
    }

    declare namespace BaseAPIType {
        interface iMethods<T> {
            get(params: GlobalType.IRecord): Promise<T>;
            list(params: GlobalType.IRecord): Promise<IListResUlt<T>>;
            post(params: GlobalType.IRecord): Promise<IResponse>;
            patch(params: GlobalType.IRecord): Promise<IResponse>;
            put(params: GlobalType.IRecord): Promise<IResponse>;
            delete(params: GlobalType.IRecord): Promise<IResponse>;
        }

        interface IListResUlt<T = any> {
            total: number;
            items: T[];
        }

        interface IURIItem {
            path: string;
            errMsg: string;
            fnUrlTransfer?: (url: string, params: IRecord) => string;
            fnParamsTransfer: (url: string, params: IRecord) => IRecord
        }

        interface IURI {
            [key: string]: IURIItem
        }

        interface IInitParams<T = IRecord> {
            mapper?: (item: IRecord) => T;
            uri: {
                IURI
            }
        }
    }

    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk
    const Ajax: IAjax

    type ITimeout = ReturnType<typeof setTimeout>

    interface Window {
        app: IApp;//全局app对象，挂载全局数据与方法
        Tools: ITools;//全局工具库对象，包含一些公用方法
        lpk: IFnLpk;//全局语言包支持函数
        Ajax: IAjax; //全局Ajax请求库
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp;
        Tools: ITools;
        lpk: IFnLpk;
    }
}