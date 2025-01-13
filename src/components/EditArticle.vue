<script setup>
import { ref, reactive, onMounted } from 'vue'
import MyEditor from './MyEditor.vue'
import DictSelect from './DictSelect.vue'
import DictCheckBox from './DictCheckBox.vue'
import UploadPic from './UploadPic.vue'
import {updateArticle, getArticleInfo, addArticleDraft} from '../api'
import {ElMessage} from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()
let articleId = route.query.articleId


onMounted(async ()=>{
  // 根据id回显信息
  await getArticleInfo(articleId)
  .then(res=>{
    if(res.data.success){
      articleData.title = res.data.data.title
      articleData.content = res.data.data.content
      articleData.category = res.data.data.category
      articleData.tags = res.data.data.tags
      articleData.cover = res.data.data.cover
      articleData.status = res.data.data.status
      console.log(res.data.data)
    }
  })
  makeReq.req = true
})



const ruleFormRef = ref()

const makeReq = reactive({
  'req':false
})

const articleData = reactive({
  title: '',
  content: '',
  category: '',
  tags:[],
  cover:'',
  status: null
})

articleData.id = articleId

function updateEditor(value) {
  articleData.content = value;
  check(ruleFormRef.value,'content')
}

function upload(value){
  articleData.cover = value;
}

const save = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateArticle(articleData)
        .then(res => {
          if (res.data.success) {
            ElMessage.success(res.data.message)
          }
        })
        .catch(error => {

        })
    } else {

    }
  })
}


const add = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addArticleDraft(articleData)
        .then(res => {
          if (res.data.success) {
            ElMessage.success(res.data.message)
          }
        })
        .catch(error => {

        })
    } else {

    }
  })
}

const saveDraft = async (formEl) => {
  check(formEl,'title')
  addArticleDraft(articleData)
    .then(res => {
      if (res.data.success) {
        ElMessage.success(res.data.message)
      }
    })
    .catch(error => {

    })
}


const check = async (formEl,field) => {
  await formEl.validateField(field,error=>{})
}


function selectChange(value) {
  articleData.category = value
}

function checkboxChange(checkList) {
  articleData.tags = checkList.value
}

const rules = reactive({
  title: [
    { required: true, message: '请输入标题', tigger: 'blur' }
  ],
  category: [
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
    <el-form-item label="分类" prop="category">
      <DictSelect placeholder="请选择分类" dictCode="wzfl" @selectChange="selectChange" :initValue="articleData.category" :makeReq="makeReq.req"></DictSelect>
    </el-form-item>
    <el-form-item label="标签" prop="tags">
      <DictCheckBox dictCode="wzbq" @checkboxChange="checkboxChange" :initValue="articleData.tags" :makeReq="makeReq.req"></DictCheckBox>
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <UploadPic @upload="upload" :value="articleData.cover"></UploadPic>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <div>
        <MyEditor @updateEditor="updateEditor" :value="articleData.content" style="min-width: 100%;"></MyEditor>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button v-if="articleData.status == 2" type="info" @click="saveDraft(ruleFormRef)">暂存草稿</el-button>
      <el-button v-if="articleData.status == 2" type="primary" @click="add(ruleFormRef)">发布</el-button>
      <el-button v-if="articleData.status == 1" type="primary" @click="save(ruleFormRef)">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style></style>