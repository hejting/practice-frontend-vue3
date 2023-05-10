<template>
  <el-container class="app-container">
    <el-header>
      <Header />
    </el-header>
    <el-container class="app-main">
      <el-aside width="200px">
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
import { provide } from 'vue'
import { useRoute } from 'vue-router'
import { routeMsg } from '@/utils/provide_inject'
const route = useRoute()

provide(routeMsg, route)

</script>

<style lang="scss">
.app-container {
  .el-header {
    --el-header-padding: 0 background-color: #545c64;
    padding-left: 200px;
  }

  .app-main {
    height: calc(100vh - 60px);
  }

  .el-main {
    --el-main-padding: 0;
    height: 100%;
  }
}
</style>
