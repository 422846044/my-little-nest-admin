<script setup>
import { useRoute, useRouter } from 'vue-router'
const route=useRoute()
const router=useRouter()
const handleSelect = ()=>{}
const ellipsis = false

const logout = ()=>{
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  router.push('/login')
}
</script>

<template>
  <el-menu :default-active="route.path" class="el-menu-demo" mode="horizontal" :ellipsis="ellipsis" @select="handleSelect" router>
    <el-menu-item index="/home">
      <template #title>
        个人小窝后台管理系统
      </template>
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="" style="padding: 0 0 0 0;">
      <template #title>
        <img style="width: 50px;border-radius:50%;margin: 5px;" src="/src/assets/logo.jpg" alt="logo" />
      </template>
      
      <el-menu-item @click="logout()">
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
