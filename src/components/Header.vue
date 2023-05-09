<template>
  <el-menu :default-active="activeIndex" class="header-menu" mode="horizontal" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item v-for="item of menu" :index="item.name" :key="item.name">{{ item.label }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem } from 'element-plus'
import { menu } from '../../menu'
import emitter from '@/utils/bus'

const activeIndex = menu[0].name
function handleSelect() {
  emitter.emit('headerChange', activeIndex)
}
</script>

<style lang="scss" scoped>
.header-menu {
  width: 100%;
  height: 60px;
}
</style>
