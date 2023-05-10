<template>
  <div id="globe" ref="globe"></div>
</template>

<script setup>
import { onWindowResize, getData, init, initGlobe } from './globe.js'
import { onMounted, ref } from 'vue'
import { useResize } from "@/composables/resize"

onMounted(() => {
  getData()
  init(globe.value, globe.value.clientWidth, globe.value.clientHeight)
  initGlobe()
})

const globe = ref()

useResize(onWindowResize, globe.value)
</script>

<style lang="scss" scoped>
#globe {
  width: 100%;
  height: 100%;
}
</style>
