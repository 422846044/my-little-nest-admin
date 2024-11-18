<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
</script>
<template>
  <!-- <el-container>
    <el-header>
      <Top v-show="show"></Top>
    </el-header>
    <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main> -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    <!-- </el-main>
      </el-container>
    
    <el-footer>

      </el-footer>
  </el-container> -->
  
</template>

<style>
#app,
html,
body{
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
}

</style>
