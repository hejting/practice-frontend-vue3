<template>
  <el-container class="app-container">
    <el-header>
      <Header />
    </el-header>
    <el-container height="100%">
      <el-aside>
        <Sidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ElContainer, ElMain, ElHeader, ElAside } from 'element-plus'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<style lang="scss">
.app-container {
  .el-header {
    background-color: #545c64;
    padding-left: 200px;
  }
}
</style>
