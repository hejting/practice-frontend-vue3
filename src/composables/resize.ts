import { onMounted, nextTick, onBeforeMount, Ref } from 'vue'

export function useResize(onWindowResize: (width: number, height: number) => void, el: Ref<HTMLElement>) {
  function handleResize() {
    nextTick(() => {
      if (el.value) {
        onWindowResize(el.value.clientWidth, el.value.clientHeight)
      }
    })
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeMount(() => {
    window.removeEventListener('resize', handleResize)
  })
}