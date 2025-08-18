<script setup>
import { ref, reactive } from 'vue'
import MyEditor from './MyEditor.vue'
import DictSelect from './DictSelect.vue'
import DictCheckBox from './DictCheckBox.vue'
import UploadPic from './UploadPic.vue'
import { addArticle, addArticleDraft, addDictDetail } from '../api'
import { ElMessage, ElMessageBox } from 'element-plus'



const ruleFormRef = ref()

const categoryComponentKey = ref(0)
const tagComponentKey = ref(0)

let articleData = reactive({
  title: '',
  content: '',
  category: 0,
  tags: [],
  cover: ''
})

const makeReq = reactive({
  req: true
})


function updateEditor(value) {
  articleData.content = value;
  check(ruleFormRef.value, 'content')
}

const save = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addArticle(articleData)
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


const saveDraft = async () => {
  // 暂存必须添加标题
  check(ruleFormRef.value, 'title')
  addArticleDraft(articleData)
    .then(res => {
      if (res.data.success) {
        ElMessage.success(res.data.message)
      }
    })
    .catch(error => {

    })
}


const check = async (formEl, field) => {
  await formEl.validateField(field, error => { })
}


function selectChange(value) {
  articleData.category = value
}

function checkboxChange(checkList) {
  articleData.tags = checkList
}

function upload(value) {
  articleData.cover = value;
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


const addTag = () => {
  ElMessageBox.prompt('请输入标签名称', '添加标签', {
    confirmButtonText: '添加',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      addDictDetail('wzbq', value)
        .then(res => {
          if (res.data.code == 200) {
            ElMessage({
              type: 'success',
              message: `添加成功`,
            })
            // 刷新标签数据
            tagComponentKey.value+=1
          } else {
            ElMessage({
              type: 'error',
              message: res.data.message
            })
          }
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消添加',
      })
    })
}

const addCategory = () => {
  ElMessageBox.prompt('请输入分类名称', '添加分类', {
    confirmButtonText: '添加',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      addDictDetail('wzfl', value)
        .then(res => {
          if (res.data.code == 200) {
            ElMessage({
              type: 'success',
              message: `添加成功`,
            })
            // 刷新分类数据
            categoryComponentKey.value+=1
          } else {
            ElMessage({
              type: 'error',
              message: res.data.message
            })
          }
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消添加',
      })
    })
}


</script>

<template>
  <el-form label-position="top" :model="articleData" :rules="rules" ref="ruleFormRef">
    <el-form-item label="标题" prop="title">
      <el-input v-model="articleData.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="分类" prop="category">
      <el-space>
        <DictSelect placeholder="请选择分类" dictCode="wzfl" :makeReq="makeReq.req" @selectChange="selectChange" :key="categoryComponentKey">
        </DictSelect>
        <el-button type="primary" text @click="addCategory">新增分类</el-button>
      </el-space>
    </el-form-item>
    <el-form-item label="标签" prop="tags">
      <el-space>
        <DictCheckBox dictCode="wzbq" @checkboxChange="checkboxChange" :makeReq="makeReq.req" :key="tagComponentKey"></DictCheckBox>
        <el-button type="primary" text @click="addTag">新增标签</el-button>
      </el-space>
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <UploadPic @upload="upload"></UploadPic>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <div>
        <MyEditor @updateEditor="updateEditor" :value="articleData.content" style="min-width: 100%;"></MyEditor>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="info" @click="saveDraft(ruleFormRef)">暂存草稿</el-button>
      <el-button type="primary" @click="save(ruleFormRef)">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<style></style>