<script setup>
import {reactive,onMounted,watch } from 'vue'
import {getDictMapByDictCode} from '../api'

const props = defineProps({
  dictCode: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "请输入"
  },
  initValue:{
    type: String,
    default: ''
  },
  makeReq:{
    type: Boolean,
    default: false
  },
  clearable:{
    type: Boolean,
    default: false
  }
})

const data = reactive({
  selectValue: ''
})

const emits = defineEmits(["selectChange"]);


const options = reactive([])

function getDice(makeReq){
  if(makeReq){
      getDictMapByDictCode({ dictCode: props.dictCode })
    .then(res => {
      if (res.data.success) {
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
    data.selectValue = props.initValue + ''
    change()
    }
}

watch(()=>props.makeReq, (newValue, oldValue)=>{
  getDice(props.makeReq)
})



onMounted(async ()=>{
  getDice(props.makeReq)
})



function change(){
  emits('selectChange', data.selectValue)
}

</script>
  

<template>
  <el-select v-model="data.selectValue" :clearable="props.clearable" :placeholder="props.placeholder" style="width: 240px" @change="change">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
      :disabled="item.disabled" />
  </el-select>
</template>

<style>
</style>
  
  