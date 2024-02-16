<script setup>
import { inject,reactive } from 'vue'
import MyEditor from './MyEditor.vue';
import DictSelect from './DictSelect.vue';
let articleData = reactive({
  title:'',
  content:'',
  gategory:0,

})
const axios = inject('$axios')

function updateEditor(value){
    articleData.content = value;
}

function save(){
  axios.post(process.env.VUE_APP_BASE_API+'/article/addArticle',articleData)
  .then(res=>{
    console.log(res)
    if(res.data.code==200){
        alert('添加成功')
    }
  })
  .catch(error=>{

  })
}

function selectChange(value){
  articleData.gategory = value
}


</script>

<template>
    <el-form :label-position="labelPosition" :model="form" :rules="rules" ref="ruleFormRef">
            <el-form-item label="标题" prop="title">
              <el-input v-model="articleData.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="分类" prop="password">
             <DictSelect placeholder="请选择分类" dictCode="wzfl" @selectChange="selectChange"></DictSelect>
            </el-form-item>
            <el-form-item>
                <div style="justify-content: center;width: 100%;">
                    <el-button type="primary" @click="onLogin(ruleFormRef)">登录</el-button>
                </div>

            </el-form-item>
        </el-form>
    
    <MyEditor @updateEditor="updateEditor" :value="articleData.content"></MyEditor>
    <el-button type="primary" @click="save">保存</el-button>
</template>

<style>
</style>