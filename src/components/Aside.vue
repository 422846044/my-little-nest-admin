<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const ellipsis = false

const handleOpen = ()=>{
    console.log('open')
}

const handleClose = ()=>{
    console.log('close')
}
</script>
<template>
    <el-menu :default-active="route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :ellipsis="ellipsis" router>
        <el-menu-item index="/articleManage">
            <template #title>
                <el-icon><Document /></el-icon>
                <span>文章管理</span>
            </template>
                <!-- <el-menu-item index="1-1"><el-icon><DocumentAdd /></el-icon><span>新建文章</span></el-menu-item>
                <el-menu-item index="1-2"><el-icon><Edit /></el-icon><span>文章管理</span></el-menu-item> -->
        </el-menu-item>
        <el-menu-item index="/home">
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
        </el-menu-item>
    </el-menu>
</template>
  
<style>

.flex-grow {
  flex-grow: 1;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

</style>