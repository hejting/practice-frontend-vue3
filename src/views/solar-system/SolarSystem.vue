<template>
  <div class="solar-system" ref="solarRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { init, addCelestialBody, onWindowResize } from './solar-system'
const solarRef = ref()
onMounted(() => {
  init(solarRef.value, solarRef.value.clientWidth, solarRef.value.clientHeight)
  addCelestialBody()
})
window.addEventListener('resize', function () {
  onWindowResize(solarRef.value.clientWidth, solarRef.value.clientHeight)
})
</script>

<style lang="scss" scoped>
.solar-system {
  height: 100%;
  width: 100%;
  :deep(canvas) {
    height: 100%;
    width: 100%;
  }
}
</style>
