import { changeTheme } from '@/config/theme.ts';
import mdlUserApi, { IUser } from '@/api/UserApi'
import { mergeLpk, changeLocale } from '@/config/lpk'
import { LOGIN_TOKEN } from '@/utils/Constants'

let iLoginUser: IUser = {} as IUser

export const initLoginUserInfo = async () => {
    if (Tools.Cookice.getItem(LOGIN_TOKEN)) {
        iLoginUser = await mdlUserApi.getSelfInfo()
        console.log(iLoginUser)
    }
}

export default {
    getLoginUser(): IUser {
        return iLoginUser
    },
    changeLocale,
    mergeLpk,
    changeTheme,
}