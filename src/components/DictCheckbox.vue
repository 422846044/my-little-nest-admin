<script setup>
import { ref, reactive,onMounted } from 'vue'
import {getDictMapByDictCode} from '../api'

const props = defineProps({
  dictCode: {
    type: String,
    default: ""
  }
})

const emits = defineEmits(["checkboxChange"]);


const options = reactive([])

const checkList = ref([])

onMounted(()=>{
  getDictMapByDictCode({ dictCode: props.dictCode })
  .then(res => {
    console.log(res)
    if (res.data.code == 200) {
      let info = res.data.data;
      for (let i = 0; i < info.length; i++) {
        options.push({
          'value': info[i].code,
          label: info[i].name,
          disabled: false
        })
      }
    }
  })
  .catch(error => {
    console.log(error)
  })
})

function change(){
  console.log(checkList)
  emits('checkboxChange',checkList)
}

</script>
  

<template>
  <el-checkbox-group v-model="checkList" @change="change">
    <el-checkbox v-for="item in options" :key="item.index" :label="item.label" :value="item.value" />
  </el-checkbox-group>
</template>



<style>
</style>
  
  