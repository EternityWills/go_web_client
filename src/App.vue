<script setup lang="ts">

Tools.LocalStorage.setItem("test_001", 'testvalue')

console.log(lpk('Index'))
let show: boolean = true

</script>

<template>
  <div>
    {{ app.getConfig('baseUrl') }}
    {{ Tools.LocalStorage.getItem("test_001") }}
    {{ lpk('Index') }}
    {{ lpk('Type', { index: 1 }) }}
    <Icon icon="icon-time" />
    <van-button type="primary">主要按钮</van-button>
    <van-calendar v-model:show="show" />
  </div>
</template>

<style scoped></style>
