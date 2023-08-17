import cookies from 'js-cookie'

const fCachePrevenCachePreventNumntRandom = Math.random()//cp随机数生成
let nCachePreventNum = 0//cp计数器
const iTools = {
    //显示全局遮罩
    showLoadMask() {

    },
    //防止API请求命中本地缓存
    addCachPrevent(url: string = '') {
        const nQueryStringFlagIndex = url.indexOf('?')
        url += `${(-1 == nQueryStringFlagIndex ? '?' : '&')}cp=${(nCachePreventNum++ + nCachePreventNum)}`

        return url
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