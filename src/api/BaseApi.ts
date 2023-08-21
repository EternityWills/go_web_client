import { get, method } from "lodash"
import { IResponse } from "@/utils/Request"
import { APIMethods } from "@/utils/Constants"
export { APIMethods } from "@/utils/Constants";



type IFnUrlAndParamsTransfer = (type: string, uriItem: BaseAPIType.IURIItem, params: GlobalType.IRecord) => { url: string; params: GlobalType.IRecord }
const transferUrlAndParams: IFnUrlAndParamsTransfer = (type, uriItem, params = {}) => {
    let url = uriItem.path

    if ('get' == type || 'delete' == type) {
        const stIdName = "id"
        url = url.replace(`:${stIdName}`, get(params, stIdName))
    }

    uriItem.fnUrlTransfer && (url = uriItem.fnUrlTransfer(url, params))
    uriItem.fnParamsTransfer && (params = uriItem.fnParamsTransfer(url, params))
    return {
        url,
        params,
    }
}
export default {
    initApi<T = any, R = BaseAPIType.iMethods<T>>(initParams: BaseAPIType.IInitParams<T>): R {
        const IAllMethods: BaseAPIType.iMethods<T> = {} as any

        [APIMethods.GET, APIMethods.LIST, APIMethods.POST, APIMethods.PATCH, APIMethods.DELETE].map(method => {
            switch (method) {
                case APIMethods.GET: {
                    IAllMethods[method] = (params: GlobalType.IRecord): Promise<T> => {
                        return Ajax.get<T>({
                            ...transferUrlAndParams('get', get(initParams, `uri.${method}`), params)
                        }).then(res => {
                            return initParams.mapper ? initParams.mapper(res.data) : res.data as T
                        }).catch((e) => {
                            Tools.processApiError(get(initParams, `uri.${method}.errMsg`, ''), e)
                            return {} as T
                        })
                    }

                }
                    break
                case APIMethods.LIST: {
                    IAllMethods[method] = (params: GlobalType.IRecord): Promise<BaseAPIType.IListResUlt<T>> => {
                        const iResult: BaseAPIType.IListResUlt<T> = {
                            total: 0,
                            items: [],
                        }

                        return Ajax.get<T>({
                            ...transferUrlAndParams('list', get(initParams, `uri.${method}`), params)
                        }).then(res => {
                            const { total, items = [] } = res.data as unknown as BaseAPIType.IListResUlt<T>
                            iResult.total = total
                            iResult.items = items.map(item => {
                                return initParams.mapper ? initParams.mapper(item) : item as T
                            })
                            return iResult
                        }).catch((e) => {
                            Tools.processApiError(get(initParams, `uri.${method}.errMsg`, ''), e)
                            return iResult
                        })

                    }
                } break

                case APIMethods.POST:
                case APIMethods.PUT:
                case APIMethods.PATCH:
                case APIMethods.DELETE: {
                    IAllMethods[method] = (params: GlobalType.IRecord): Promise<IResponse> => {
                        return Ajax[method]<T>({
                            ...transferUrlAndParams('method', get(initParams, `uri.${method}`), params)
                        }).catch((e) => {
                            Tools.processApiError(get(initParams, `uri.${method}.errMsg`, ''), e)
                            return {} as IResponse
                        })
                    }
                }
                    break
            }
        })
        return IAllMethods as unknown as R
    }
}