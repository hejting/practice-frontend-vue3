<template>
  <el-menu :default-active="activeIndex" class="sidebar-menu" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item v-for="item of sidebarList" :index="item.name" :key="item.name">{{ item.label }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMenu, ElMenuItem } from 'element-plus'
import { menu } from '../../menu'

const route = useRoute()
const router = useRouter()

const activeIndex = ref()
const sidebarList = ref()
onMounted(() => {
  activeIndex.value = route.name
  console.log(route)
  const list = menu.find(item => item.name === route.meta.parent)
  console.log(route.meta.parent, list)
  sidebarList.value = list?.child || []
})
function handleSelect() {
  console.log(activeIndex)
  router.push({ name: activeIndex.value })
}

</script>

<style lang="scss" scoped>
.sidebar-menu {
  width: 200px;
  height: calc(100vh - 60px);
}
</style>
