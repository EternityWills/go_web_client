import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { clearTimeout } from 'timers';
import qs from 'qs'
import { LOGIN_TOKEN } from './Constants';

//扩展axios的类型
export interface AxiosRequestConfigExt extends AxiosRequestConfig {
    reqParams: AxiosRequestConfigExt//请求参数,
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

const gstMethods: string[] = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']


const Ajax = {
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