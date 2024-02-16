<script setup>
import { useRoute } from 'vue-router';
const route=useRoute()
const handleSelect = ()=>{}
const ellipsis = false
</script>

<template>
  <el-menu :default-active="route.path" class="el-menu-demo" mode="horizontal" :ellipsis="ellipsis" @select="handleSelect" router >
    <el-menu-item index="0">
      <template #title>
        个人小窝后台管理系统
      </template>
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="" style="padding: 0 0 0 0;">
      <template #title>
        <img style="width: 50px;border-radius:50%;margin: 5px;" src="/src/assets/logo.jpg" alt="logo" />
      </template>
      
      <el-menu-item>
        注销
      </el-menu-item>
    </el-sub-menu>
    
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.el-menu-demo{
  width: 100%;
}

</style>
