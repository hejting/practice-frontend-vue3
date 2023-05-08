<template>
  <el-menu :default-active="activeIndex" class="header-menu" mode="horizontal" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item index="three">three.js</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem } from 'element-plus'

const activeIndex = 'three'
function handleSelect() {
  console.log(activeIndex)
}
</script>

<style lang="scss" scoped>
.header-menu {
  width: 100%;
  height: 60px;
}
</style>
