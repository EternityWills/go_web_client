import { changeTheme } from '@/config/theme.ts';
import mdlUserApi, { IUser } from '@/api/UserApi'
import { mergeLpk, changeLocale } from '@/config/lpk'
import { LOGIN_PATH, LOGIN_TOKEN } from '@/utils/Constants'

let iLoginUser: IUser = {} as IUser

export const initLoginUserInfo = async () => {
    if (Tools.Cookice.getItem(LOGIN_TOKEN)) {
        iLoginUser = await mdlUserApi.getSelfInfo()
    }
}

export default {
    getLoginUser() {
        return iLoginUser
    },
    clearLogInInfo() {
        iLoginUser = {} as IUser
        Tools.Cookice.removeItem(LOGIN_TOKEN)
    },
    redirectToLogin() {
        this.clearLogInInfo()
        document.location.href = LOGIN_PATH
    },
    changeLocale,
    mergeLpk,
    changeTheme,
}