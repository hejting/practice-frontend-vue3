<template>
  <div id="globe"></div>
</template>

<script setup>
import globe from './globe.js'
import { onMounted } from 'vue'
onMounted(() => {
  globe('globe')
})
</script>

<style lang="scss" scoped>
#globe {
  width: 100%;
  height: 100%;
}
</style>
