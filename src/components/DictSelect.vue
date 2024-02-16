<script setup>
import { ref, inject, reactive,onMounted } from 'vue'

const props = defineProps({
  dictCode: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "请输入"
  }
})

const axios = inject('$axios')

const emits = defineEmits(["selectChange"]);


const value = ref('')
const options = reactive([])

onMounted(()=>{
  axios.get(process.env.VUE_APP_BASE_API + '/dict/getDictDetailsByDictCode',{params:{ dictCode: props.dictCode }} )
  .then(res => {
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
  emits('selectChange', value.value)
}

</script>
  

<template>
  <el-select v-model="value" :placeholder="props.placeholder" style="width: 240px" @change="change">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
      :disabled="item.disabled" />
  </el-select>
</template>

<style>
</style>
  
  