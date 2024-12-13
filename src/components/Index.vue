<script setup>
import Top from '../components/Top.vue'
import Aside from '../components/Aside.vue'
import Breadcrumb from './Breadcrumb.vue';
import { ref,onMounted,computed} from "vue"
import { useRoute,useRouter } from 'vue-router';

const route = useRoute();

const routes = computed(()=>{
  return route.matched
})

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
            <Breadcrumb :routes="routes" active-title="test"></Breadcrumb>
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
        </el-container>
      <el-footer>
  
        </el-footer>
    </el-container>
  </template>