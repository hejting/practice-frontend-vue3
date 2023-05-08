<template>
  <el-menu :default-active="activeIndex" class="sidebar-menu" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item index="solar">solar system</el-menu-item>
    <el-menu-item index="globe">globe</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem } from 'element-plus'

const activeIndex = 'solar'
function handleSelect() {
  console.log(activeIndex)
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  width: 200px;
  height: calc(100vh - 60px);
}
</style>
