import { onMounted, nextTick, onBeforeMount } from 'vue'

export function useResize(onWindowResize: (width: number, height: number) => void, el: HTMLElement) {
  function handleResize() {
    nextTick(() => {
      if (el) {
        onWindowResize(el.clientWidth, el.clientHeight)
      }
    })
  }

  onMounted(() => window.addEventListener('resize', handleResize))

  onBeforeMount(() => {
    window.removeEventListener('resize', handleResize)
  })
}