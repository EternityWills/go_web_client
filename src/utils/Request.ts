import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { get } from 'lodash'
import app from '@/config/app'
import { LOGIN_TOKEN, APIMethods } from './Constants';


//扩展axios的类型
export interface AxiosRequestConfigExt extends AxiosRequestConfig {
    reqParams?: AxiosRequestConfigExt//请求参数,
    showLoading?: boolean;//是否显示loading提示
    bIsNeedCachPrevent?: boolean;//是否加上防缓存的cp随机数
    bIsNeedJsonStringify?: boolean;//是否需要JSON.stringify
    bIsNeedQSStringify?: boolean;//是否需要qs.stringify
    force401ToLogin?: boolean//遇401是否强制跳转到登录页
}
export interface IResponse<T = any> {
    code: number;
    data: T
    msg: string;
}

//设置axios默认配置选项
axios.defaults.headers.head['Content-Type'] = 'application/json;chartset=utf-8'

//定义改模块内全局变量
let timerLoading: ITimeout
const axiosInstance: AxiosInstance = axios.create({
    baseURL: app.getConfig('baseUrl'),
    timeout: 10000,
})

//定义每次请求响应处理
axiosInstance.interceptors.response.use((res: AxiosResponse<IResponse>) => {
    //请求未出异常处理
    //清除loading计时器，并且隐藏loading
    clearTimeout(timerLoading)
    Tools.hideLoadMask()

    //获取响应内容及其它处理
    const { status, data, config } = res
    const { reqParams = {} } = config as AxiosRequestConfigExt
    const { force401ToLogin = false } = reqParams

    //http:200处理
    if (200 == status) {
        if (data) {
            if (401 == data.code && force401ToLogin) {
                app.getAppCtl().redirectToLogin()
                return
            } else if (data.code >= 400 && data.code <= 404 || 500 == data.code) {
                return Promise.reject(data)
            }
        }

        return data
    } else {
        //非200状态处理
        return Promise.reject(data)
    }

}, (error) => {
    clearTimeout(timerLoading)
    Tools.hideLoadMask()

    //错误解析
    let { message = 'Request Error', response } = error
    const stErrMsg = get(response, 'data.msg', message)
    return Promise.reject(stErrMsg)
})

//定义常用请求方法
type IAjaxMethod = APIMethods.GET | APIMethods.POST | APIMethods.PUT | APIMethods.PATCH | APIMethods.DELETE
type IFnAjaxMethodHandler = <T = any>(reqParams: AxiosRequestConfigExt) => Promise<IResponse<T>>


//绑定多种请求类型方法
const iAllMethods: { [key in IAjaxMethod]: IFnAjaxMethodHandler } = {} as any
const gstMethods: string[] = [APIMethods.GET, APIMethods.POST, APIMethods.PUT, APIMethods.PATCH, APIMethods.DELETE].map(method => method.toUpperCase)
gstMethods.map(method => {
    const fnHandler: IFnAjaxMethodHandler = <T = any>(reqParams: AxiosRequestConfigExt | string): Promise<IResponse<T>> => {
        if ('GET' == method) {
            if ('string' === typeof reqParams) {
                reqParams = {
                    url: reqParams,
                    params: '',
                }
            }
        }

        return Ajax.request<T>(method, reqParams as AxiosRequestConfigExt)
    }
    iAllMethods[method.toLocaleLowerCase() as IAjaxMethod] = fnHandler
})

const Ajax = {
    ...iAllMethods,
    request<T = any>(method: string, reqParams: AxiosRequestConfigExt): Promise<IResponse<T>> {
        //获取请求参数
        let {
            url,
            params,
            headers = {},
            timeout,
            showLoading = true,
            bIsNeedCachPrevent,    //是否加上防缓存的cp随机数
            bIsNeedJsonStringify,       //是否需要JSON.stringify
            bIsNeedQSStringify,        //是否需要qs.stringify
            force401ToLogin,            //遇401是否强制跳转到登录页
        } = reqParams

        //判断是否需要显示loading
        if (false !== showLoading) {
            clearTimeout(timerLoading)
            timerLoading = setTimeout(() => {
                Tools.showLoadMask()
            }, 200)
        }

        //判断是否需要加防缓存处理
        (false !== bIsNeedCachPrevent) && (url = Tools.addCachPrevent(url))

        //是否需要JSON.stringify
        bIsNeedJsonStringify && (params = JSON.stringify(params))

        //是否需要qs.stringify
        bIsNeedQSStringify && (params = qs.stringify(params))

        //设置登录Token
        const stLoginToken = Tools.Cookice.getItem(LOGIN_TOKEN)
        stLoginToken && (headers.Authorization = `Bearer:${stLoginToken}`)

        const iSendReqParams: AxiosRequestConfigExt = {
            reqParams,
            url,
            method: (gstMethods.indexOf(method) > -1 ? method : 'GET'),
            [method === 'GET' ? 'params' : 'data']: params,
            headers: Object.assign({}, headers),
        }

        timeout && (iSendReqParams.timeout = timeout)

        return axiosInstance.request(iSendReqParams)
    }
}

export type IAjax = typeof Ajax

export default Ajax