<template>
  <div class="solar-system" ref="solarRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { init, addCelestialBody, onWindowResize } from './solar-system'
const solarRef = ref()
onMounted(() => {
  init(solarRef.value, solarRef.value.clientWidth - 1, solarRef.value.clientHeight - 1)
  addCelestialBody()
})
window.addEventListener('resize', function () {
  onWindowResize(solarRef.value.clientWidth - 1, solarRef.value.clientHeight - 1)
})

</script>

<style lang="scss" scoped>
.solar-system {
  height: 100%;
  width: 100%;
}
</style>