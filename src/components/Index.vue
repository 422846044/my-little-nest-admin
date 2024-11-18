<script setup>
import Top from '../components/Top.vue'
import Aside from '../components/Aside.vue'
import { ref,onMounted} from "vue"
let show=ref(null)
onMounted(() => {
   show.value = !!localStorage.getItem('access_token')
  
})
</script>
<template>
    <el-container>
      <el-header>
        <Top v-show="show"></Top>
      </el-header>
      <el-container>
          <el-aside width="200px">
            <Aside></Aside>
          </el-aside>
          <el-main>
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
        </el-container>
      
      <el-footer>
  
        </el-footer>
    </el-container>
  </template>