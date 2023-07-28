
declare global{
    declare namespace GlobalType{
        type Ikey = string|number;
        type IRecord = Record<Ikey,any>
    }

    interface Window{
        app:GlobalType.IRecord;
    }
}

declare module 'vue'{
    interface ComponentCustomProperties{
        app:GlobalType.IRecord
    }
}
export {}