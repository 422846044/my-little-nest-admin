<template>
  <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadUrl"
    :http-request="customUpload" :on-remove="handleRemove" :limit="props.limit" v-model:file-list="picList"
    :on-exceed="limitExceed">
    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { uploadFile as uploadFileMethod } from '../utils/qiniu';

const emits = defineEmits(['upload'])

const props = defineProps({
  limit: {
    Type: Number,
    default: 1
  },
  value: {
    Type: String,
    default: ''
  }
})

const imgUrl = ref('')



onMounted(() => {
  // imgUrl.value = props.value
})



const picList = ref([])



watch(() => props.value, (newValue, oldValue) => {
  if (oldValue == '') {
    imgUrl.value = newValue
    let name = imgUrl.value.substring(imgUrl.value.lastIndexOf('/') + 1)
    picList.value.push({ name: name, url: imgUrl.value })
  }
})

// 七牛云图片上传
const uploadUrl = "https://upload.qiniup.com"

function customUpload(file) {
  uploadFileMethod(file.file, conUrl)
}

function conUrl(url) {
  imgUrl.value = url
  emits('upload', url)
  // let name = imgUrl.value.substring(imgUrl.value.lastIndexOf('/') + 1)
  // picList.value.push({name: name,url:imgUrl.value})
}



const beforeAvatarUpload = (rawFile) => {
  console.log(picList)
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('不支持当前文件格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('文件大小不能超过5MB!')
    return false
  }
  if (picList.value.length + 1 > props.limit) {
    ElMessage.error('只能添加' + props.limit + '个图片')
    return false
  }
  return true
}

const handleRemove = () => {

}

const limitExceed = () => {
  ElMessage.error('只能添加' + props.limit + '个图片')
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