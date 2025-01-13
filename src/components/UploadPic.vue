<template>
    <el-upload
      class="avatar-uploader"
      :before-upload="beforeAvatarUpload"
      :action="uploadUrl"
      :http-request="customUpload"
      :on-remove="handleRemove"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </template>
  
<script  setup>
import {ref, onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { uploadFile as uploadFileMethod } from '../utils/qiniu';

const emits = defineEmits(['upload'])

const props = defineProps({
  limit:{
    Type: Number,
    default: 1
  },
  value:{
    Type: String,
    default: ''
  }
})

onMounted(()=>{
  imgUrl.value = props.value
})

let imgUrl = ref('')

let picList = []

  // 七牛云图片上传
const uploadUrl = "https://upload.qiniup.com"

function customUpload(file){
  uploadFileMethod(file.file, conUrl)
}

function conUrl(url){
  imgUrl.value = url
  emits('upload',url)
  picList.push(url)
}
  
  
  
  const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
      ElMessage.error('不支持当前文件格式!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('文件大小不能超过5MB!')
      return false
    }
    if(picList.length + 1 > props.limit){qqqqqqqqqqqq
      ElMessage.error('只能添加'+ props.limit +'个图片')
      return false
    }
    return true
  }
  </script>
  
  <style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
  
  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  </style>