<script setup lang="ts">
import mdIUesrApi from '@/api/UserApi';

onMounted(async () => {
    const iUser = await mdIUesrApi.get({ id: 2, name: 'zs' })
    console.log('1', iUser)

    const iUserList = await mdIUesrApi.list({ npagSize: 2 })
    console.log('2', iUserList)

    mdIUesrApi.post({ name: 'ls', age: 22, sex: 12 })

})

</script>

<template>
    <div class="index-w">
        <div class="title">Index.vue</div>

        <keep-alive-router-view />

        <ul class="g-flex-rsbc">
            <li>
                <router-link :to="{ name: 'home' }">{{ lpk('page.index.Title') }}</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'blogIndex' }">{{ lpk('Blog') }}</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'my' }">{{ lpk('page.my.Title') }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.index-w {
    background: #663322;

    .title {
        margin: 30px;
    }
}
</style>