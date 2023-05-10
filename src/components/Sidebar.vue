<template>
  <el-menu :default-active="activeIndex" class="sidebar-menu" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item v-for="item of sidebarList" :index="item.name" :key="item.name">{{ item.label }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, inject, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { ElMenu, ElMenuItem } from 'element-plus'
import { menu } from '../../menu'
import emitter from '@/utils/bus'
import { routeMsg } from '@/utils/provide_inject'

const routeData = inject(routeMsg)
const activeIndex = ref()
const sidebarList = ref()

const parent = ref('')
watchEffect(() => {
  if (parent.value !== routeData.meta.parent) {
    parent.value = routeData.meta.parent
    const list = menu.find(item => item.name === parent.value)
    sidebarList.value = list?.child
  }
  activeIndex.value = routeData.name
})

const router = useRouter()

emitter.on('headerChange', headerChange)

function headerChange() {
  // const list = menu.find(item => item.name === route.meta.parent)
  // sidebarList.value = list?.child
  // console.log(route.meta.parent)
  // activeIndex.value = sidebarList.value[0].name
  sidebarList.value = menu[0].child

}
function handleSelect(key: string) {
  router.push({ name: key })
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  width: 200px;
  height: calc(100vh - 60px);
}
</style>
