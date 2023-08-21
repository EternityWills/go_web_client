import cookies from 'js-cookie'

const fCachePrevenCachePreventNumntRandom = Math.random()//cp随机数生成
let nCachePreventNum = 0  //cp计数器
const iTools = {
    //显示全局遮罩
    showLoadMask() {

    },
    //关闭全局遮罩
    hideLoadMask() {

    },
    //防止API请求命中本地缓存
    addCachPrevent(url: string = '') {
        const nQueryStringFlagIndex = url.indexOf('?')
        url += `${(-1 == nQueryStringFlagIndex ? '?' : '&')}cp=${(nCachePreventNum++ + fCachePrevenCachePreventNumntRandom)}`

        return url
    },
    //显示错误提示
    showError(title: string = '', msg: string = '') {
        alert(`${title}:${msg}`)
    },
    //处理API调用错误
    processApiError(title: string,
        res: (string | { msg: string }) = { msg: '' },
        options: { bIsShowInfo: boolean } = { bIsShowInfo: true }
    ) {
        if ('string' == typeof res) {
            res = { msg: res }
        }

        title = lpk(title)
        const stContent = lpk(res.msg) || ''
        const stMsg = `${title}: ${stContent}`
        if (false !== options.bIsShowInfo) {
            Tools.showError(title, stContent)
        }

        window.console && window.console.log && window.console.log(res)
        throw stMsg
    },
    Router: {//路由操作命名空间

    },
    Store: {//状态管理操作命名空间

    },
    LocalStorage: {//本地存储命名空间
        setItem(key: string, value: any) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        getItem(key: string) {
            const stValue = localStorage.getItem(key)
            try {
                return JSON.parse(stValue as string)
            } catch (e) {
                return stValue
            }
        },
        removeItem(key: string) {
            localStorage.removeItem(key)
        }
    },
    Cookice: {//cookice操作命名空间
        setItem(key: string, value: any) {
            cookies.set(key, value, { expires: 30 })
        },
        getItem(key: string, defaultValue?: any) {
            const stValue = cookies.get(key) || defaultValue
            try {
                return JSON.parse(stValue)
            } catch (e) {
                return stValue
            }
        },
        removeItem(key: string) {
            cookies.remove(key)
        }
    },
    Time: {//日期时间操作命名空间

    },
    Dom: {//Dom元素操作命名空间

    }
}

export type ITools = typeof iTools

export default iTools