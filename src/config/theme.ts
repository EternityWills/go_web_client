import { THEME_OPTIONS } from './../utils/Constants';
import { get } from 'lodash'

//系统主题定义
const stThemeStoragName: string = 'theme' //存储主题字段名称
const stDefaultTheme: string = THEME_OPTIONS[0]
let stCurUserTheme: string = ''

//初始化系统主题
export const initTheme = () => {
    changeTheme(getTheme(), false)
}

//切换主题
export const changeTheme = (stArgTheme: string, bIsNeedSave: boolean = true) => {
    //入参校验：主题字段
    if (!THEME_OPTIONS.find(stThemeItem => stThemeItem == stArgTheme)) {
        return
    }

    document.documentElement.setAttribute('data-theme', stArgTheme)

    if (!bIsNeedSave || stCurUserTheme == stArgTheme) return

    //如果用户已登录，调用Api保存


    //本地保存
    Tools.LocalStorage.setItem(stThemeStoragName, stCurUserTheme)
}

//获取当前主题
export const getTheme = () => {
    if (stCurUserTheme) {
        return stCurUserTheme
    }
    const iLoginUser = app.getAppCtl().getLoginUser()

    //优先从登录者自定义信息中获取
    stCurUserTheme = get(iLoginUser, 'cust.theme')

    //其次从本地存储中获取
    stCurUserTheme = stCurUserTheme || Tools.LocalStorage.getItem(stThemeStoragName)

    //默认
    stCurUserTheme = stCurUserTheme || stDefaultTheme

    return stCurUserTheme


}