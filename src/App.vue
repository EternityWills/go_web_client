<script setup lang="ts">
  Tools.LocalStorage.setItem("test_001", 'testvalue')
</script>

<template>
  <div>
    {{ app.getConfig('baseUrl') }}
    {{ Tools.LocalStorage.getItem("test_001") }}
  </div>
</template>

<style scoped></style>
