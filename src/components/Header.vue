<template>
  <el-menu :default-active="activeIndex" class="header-menu" mode="horizontal" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item v-for="item of menu" :index="item.name" :key="item.name">{{ item.label }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem } from 'element-plus'
import { ref, inject, watchEffect } from 'vue'
import { menu } from '../../menu'
import { useRouter } from 'vue-router'
import { routeMsg } from '@/utils/provide_inject'

const activeIndex = ref()
const routeData = inject(routeMsg)

watchEffect(() => {
  activeIndex.value = routeData.meta.parent
})

const router = useRouter()
function handleSelect(key: string) {
  router.push({ name: key })
}
</script>

<style lang="scss" scoped>
.header-menu {
  width: 100%;
  height: 60px;
}
</style>
