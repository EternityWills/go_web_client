import sysCfg,{ISysCfg,ISysCfgBModItem} from "./syscfg"
import appCtl from "@/controller/AppCtl"

const app = {
    //获取系统配置信息
    getConfig<T>(key:keyof ISysCfg):T{
        return sysCfg[key]as unknown as T
    },

    //判断启用的业务模块
    checkBmodIsEnable(stModuleName:string){
        const bmodNames:ISysCfgBModItem[] = app.getConfig<ISysCfgBModItem[]>("bmodNames")

        if(bmodNames.find(item=>item.name==stModuleName&&item.enable)){
            return true
        }

        return false
    },
    getAppCtl(){
        return appCtl
    }
}

export type IApp = typeof app

export default app