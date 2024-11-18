<script setup>
import { reactive,ref,inject } from 'vue'
import {login} from '../api'
import {ElMessageBox,ElMessage} from 'element-plus'
import { useRouter } from 'vue-router'
import JsEncrypt from "jsencrypt"
import { publicKey } from '../utils/publicKey'

const router = useRouter()

const form = reactive({
    username: '422846044',
    password: '422846044'
})
const ruleFormRef = ref()
// let je = new JsEncrypt()
// je.setPublicKey(publicKey)
// je.encrypt(form.password)

const rules = reactive({
    username:[
        {required:true,message:'请输入用户名',tigger:'blur'}
    ],
    password:[
        {required:true,message:'请输入密码',tigger:'blur'}
    ]
})

var axios = inject('$axios')

const onLogin = async (formEl)=>{
    console.log(formEl)
    if (!formEl) return
    await formEl.validate((valid, fields) => {
    if (valid) {
      login(form)
      .then(res=>{
        if(res.data.code==200){
            localStorage.setItem('access_token',res.data.data.accessToken)
            localStorage.setItem('refresh_token',res.data.data.refreshToken)
            console.log(localStorage.getItem('access_token'))
            router.push('/home')
            ElMessage.success(res.data.message)
        }else{
            ElMessage.error(res.data.message)
        }
      })
      .catch(error=>{
        console.log(error)
        ElMessage.error('请求失败')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}


</script>

<template>
    <div class="fullscreen-div">
        <el-form label-position="top" :model="form" :rules="rules" ref="ruleFormRef">
            <h2>个人小窝后台管理系统</h2>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <div style="justify-content: center;width: 100%;">
                    <el-button type="primary" @click="onLogin(ruleFormRef)">登录</el-button>
                </div>

            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.el-form {
    border: 6px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 50%;
    background-color: rgba(255, 255, 255, 0.6);
}

.fullscreen-div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    /* 视窗宽度 */
    height: 100vh;
    /* 视窗高度 */
    background-image: url('../assets/login_background.jpeg');
    background-position: center center;
    background-size: cover;
}

#app,
html,
body,
.el-main {
    margin: 0;
    padding: 0 !important;
    width: 100%;
    height: 100%;
}
</style>