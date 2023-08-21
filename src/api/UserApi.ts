import mdBaseApi, { APIMethods } from './BaseApi'
import { get } from 'lodash';

export interface IUser {
    id: number;
    name: string;
}

const initBaseAPIParams: BaseAPIType.IInitParams = {
    uri: {
        [APIMethods.GET]: {
            path: '/data_get.json',
            errMsg: 'err.user.load',
            // fnUrlTransfer(url, params) {
            //     return "data_get_detail.json"
            // },
            // fnParamsTransfer(url, params) {
            //     return {
            //         id: 999999
            //     }
            // }
        },
        [APIMethods.LIST]: { path: '/data.json', errMsg: 'err.user.load' },
        [APIMethods.POST]: { path: '/user', errMsg: '添加用户失败' }
    },
    // mapper(item: GlobalType.IRecord): IUser {
    //     return {
    //         id: get(item, 'id'),
    //         name: get(item, 'name111'),

    //     }
    // }
}

export default {
    ...mdBaseApi.initApi<IUser, Pick<BaseAPIType.iMethods<IUser>, APIMethods.GET | APIMethods.LIST | APIMethods.POST>>(initBaseAPIParams),
    getSelfInfo(): Promise<IUser> {
        return Promise.resolve({
            id: 1,
            name: 'zs'
        })
    }
}