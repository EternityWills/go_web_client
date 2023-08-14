<script setup lang="ts">
import { useRoute } from 'vue-router'
import { get } from 'lodash'

interface IKeepAliveRouterViewState {
    giExcludeNames: string[];
}

const iState = reactive<IKeepAliveRouterViewState>({
    giExcludeNames: [],
})


const { giExcludeNames } = toRefs(iState)

watch(useRoute(), (newValue, oldValue) => {
    if (false === get(newValue, 'meta.KeepAlive', true)) {
        //const stCmpName = get(newValue, 'meta.cmpName', '')
        const stCmpName = get(newValue.matched[newValue.matched.length - 1], 'components.default["__name"]', '')
        console.log(newValue)
        if (stCmpName && -1 == iState.giExcludeNames.indexOf(stCmpName)) {
            iState.giExcludeNames.push(stCmpName)
        }
    }
}, { deep: true })

</script>

<template>
    <router-view v-slot="{ Component }">
        <keep-alive :exclude="giExcludeNames">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<style lang="scss" scoped></style>