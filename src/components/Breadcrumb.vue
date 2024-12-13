
<script setup >
  import { computed,onMounted } from 'vue';
  import { ArrowRight } from '@element-plus/icons-vue';
   
  const props = defineProps({
    routes: {
      type: Array,
      default: () => []
    },
    activeTitle: {
      type: String,
      default: ""
    }
  });
   
  onMounted(()=>{
    console.log(props.routes)
  })
  const routes = computed(() => props.routes);
  const activeTitle = computed(() => props.activeTitle);

  </script>

<template>
    <el-breadcrumb :separator-icon="ArrowRight" v-if="routes.length" class="breadcrumb-items">
      <el-breadcrumb-item
        v-for="route in routes"
        :key="route.name"
        :to="route.path"
        :class="{ 'active-title': route.name == activeTitle }"
      >
        {{ route.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </template>
   

  <style >
  .breadcrumb-items {
  margin: 0px 0px 20px 0px;
  .active-title {
    font-size: 24px;
  }
}
  </style>