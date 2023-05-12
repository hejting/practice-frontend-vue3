<template>
  <div id="globe" ref="globeRef"></div>
</template>

<script setup>
import { onWindowResize, getData, init, initGlobe } from './globe.js'
import { onMounted, ref } from 'vue'
import { useResize } from "@/composables/resize"

const globeRef = ref()

onMounted(() => {
  init(globeRef.value, globeRef.value.clientWidth, globeRef.value.clientHeight)
  initGlobe()
  getData()
})

useResize(onWindowResize, globeRef)

</script>

<style lang="scss" scoped>
#globe {
  width: 100%;
  height: 100%;

  :deep(svg) {
    width: 100%;
    height: 100%
  }
}
</style>
