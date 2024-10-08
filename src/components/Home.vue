<script setup>
import { ref, inject, reactive } from 'vue'
import MyEditor from './MyEditor.vue';
import DictSelect from './DictSelect.vue';


const ruleFormRef = ref()

let articleData = reactive({
  title: '',
  content: '',
  gategory: 0,

})
const axios = inject('$axios')


function updateEditor(value) {
  articleData.content = value;
  check(ruleFormRef.value,'content')
}

const save = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios.post(process.env.VUE_APP_BASE_API + '/article/addArticle', articleData)
        .then(res => {
          console.log(res)
          if (res.data.code == 200) {
            alert('添加成功')
          }
        })
        .catch(error => {

        })
    } else {

    }
  })
}

const check = async (formEl,field) => {
  await formEl.validateField(field,error=>{})
}


function selectChange(value) {
  articleData.gategory = value
}

const rules = reactive({
  title: [
    { required: true, message: '请输入标题', tigger: 'blur' }
  ],
  gategory: [
    { required: true, message: '请选择分类', tigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入内容', tigger: 'edit' }
  ]
})





</script>

<template>
  <el-form label-position="top" :model="articleData" :rules="rules" ref="ruleFormRef">
    <el-form-item label="标题" prop="title">
      <el-input v-model="articleData.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="分类" prop="gategory">
      <DictSelect placeholder="请选择分类" dictCode="wzfl" @selectChange="selectChange"></DictSelect>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <div >
        <MyEditor @updateEditor="updateEditor" :value="articleData.content" style="min-width: 100%;"></MyEditor>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save(ruleFormRef)">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style></style>