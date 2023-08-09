<script setup lang="ts">

Tools.LocalStorage.setItem("test_001", 'testvalue')

console.log(lpk('Index'))
let show: boolean = true

</script>

<template>
  <div class="app-w">
    <div class="title">App.vue</div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.app-w {
  background: #f00;

  .title {
    margin: 30px;
  }
}
</style>
