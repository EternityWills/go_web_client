import app from './app'

//声明全局变量相关的类型
type globalVarKey = 'app'|'lpk'|'Tools'|'Ajax'

const iGlobalVars:GlobalType.IRecord={
    app, //全局应用对象
}

Object.keys(iGlobalVars).forEach(stkey=>{
    (window as any)[stkey as globalVarKey]=iGlobalVars[stkey]
});

export const ininApp =async()=>{
    
}