import app from './app'
import Tools from "@/utils/Tools"

//声明全局变量相关的类型
type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IIGlobalVars = {
    [key in IGlobalVarsKey]?: any
}

const iGlobalVars: IIGlobalVars = {
    app, //全局应用对象
    Tools,//全局工具库对象，包含一些公用方法
}

Object.keys(iGlobalVars).forEach(stkey => {
    (window as any)[stkey as IGlobalVarsKey] = iGlobalVars[stkey as IGlobalVarsKey] 
});

export const ininApp = async () => {

}