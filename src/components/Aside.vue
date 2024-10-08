<script setup>
const handleOpen = ()=>{
    console.log('open')
}
</script>
<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Document /></el-icon>
                <span>文章管理</span>
            </template>
                <el-menu-item index="1-1"><el-icon><DocumentAdd /></el-icon><span>新建文章</span></el-menu-item>
                <el-menu-item index="1-2"><el-icon><Edit /></el-icon><span>编辑文章</span></el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
        </el-menu-item>
    </el-menu>
</template>
  
<style>
</style>