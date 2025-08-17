<script setup>
import { reactive, ref, inject } from 'vue'
import { login } from '../api'
import { ElMessageBox, ElMessage } from 'element-plus'
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
    username: [
        { required: true, message: '请输入用户名', tigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', tigger: 'blur' }
    ]
})

const onLogin = async (formEl) => {
    console.log(formEl)
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            login(form)
                .then(res => {
                    if (res.data.code == 200) {
                        localStorage.setItem('access_token', res.data.data.accessToken)
                        localStorage.setItem('refresh_token', res.data.data.refreshToken)
                        console.log(localStorage.getItem('access_token'))
                        router.push('/home')
                        ElMessage.success(res.data.message)
                    } else {
                        ElMessage.error(res.data.message)
                    }
                })
                .catch(error => {
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
    <div class=" login-container animated-background">
        <!-- SVG滤镜库 -->
        <svg style="display: none">
            <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
                <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17"
                    result="turbulence" />
                <feComponentTransfer in="turbulence" result="mapped">
                    <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                    <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
                    <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
                </feComponentTransfer>
                <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
                <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100"
                    lighting-color="white" result="specLight">
                    <fePointLight x="-200" y="-200" z="300" />
                </feSpecularLighting>
                <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
                <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R"
                    yChannelSelector="G" />
            </filter>
        </svg>

        <!-- 登录卡片 -->
        <div class="glass-component login-card" ref="tiltCard">
            <div class="glass-effect"></div>
            <div class="glass-tint"></div>
            <div class="glass-shine"></div>
            <div class="glass-content">
                <!-- <h2 class="login-title">欢迎登录</h2>
                <form class="login-form">
                    <div class="form-group">
                        <input type="text" placeholder="用户名" class="glass-input">
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="密码" class="glass-input">
                    </div>
                    <button type="submit" class="glass-button">登录</button>
                </form> -->
                <el-form class="login-form" label-position="top" :model="form" :rules="rules" ref="ruleFormRef">
                    <h2 class="login-title">个人小窝后台管理系统</h2>
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="form.username" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password" />
                    </el-form-item>
                    <el-form-item>
                            <el-button class="glass-button" style="margin-top: 20px;" type="primary" @click="onLogin(ruleFormRef)">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>

</template>

<style scoped>
.el-form {
    /* border: 6px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 50%;
    background-color: rgba(255, 255, 255, 0.6); */
}

:deep(.el-input) {
    width: 90%;
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    box-sizing: content-box;

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    --el-input-focus-border-color: rgba(255, 255, 255, 0);

}

:deep(.el-input::placeholder) {
    color: rgba(255, 255, 255, 0.7);

}

:deep(.el-input:focus-within) {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

:deep(.el-input__wrapper) {
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0) inset;
    padding: 0px 0px;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0) !important;
}

:deep(.el-input__wrapper.is_focus) {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0) !important;
}

:deep(.no-focus-input) {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0) !important;
}

:deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0) !important;
}




:deep(.el-input__inner) {
    --el-input-inner-height: 20px;
    color: white
}

:deep(.el-button){
    height: 44px;
}

:deep(.el-form-item__label){
    color: white;
    color: rgba(255, 255, 255, 0.7);
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
    background-image: url('http://cdn.zhongyingjie.top/public/static/admin/login_background.jpeg');
    background-position: center center;
    background-size: cover;
}

.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.animated-background {
    width: 100%;
    height: 100%;
    background-image: url('http://cdn.zhongyingjie.top/public/static/admin/login_background.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.login-card {
    width: 400px;
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.10), 0 1.5px 6px 0 rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.6);
    /* cursor: pointer; */
    background: transparent;
}

.glass-effect {
    position: absolute;
    inset: 0;
    z-index: 0;
    backdrop-filter: blur(5px);
    filter: url(#glass-distortion);
    isolation: isolate;
    border-radius: 24px;
}

.glass-tint {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 24px;
}

.glass-shine {
    position: absolute;
    inset: 0;
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 24px;
    box-shadow:
        inset 1px 1px 8px 0 rgba(255, 255, 255, 0.18),
        inset -1px -1px 8px 0 rgba(255, 255, 255, 0.08);
    pointer-events: none;
}

.glass-content {
    position: relative;
    z-index: 3;
    padding: 2rem;
    color: white;
}

.login-title {
    text-align: center;
    color: #fff;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 1.5rem;
}

.glass-input {
    width: 90%;
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    &:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    }
}

.glass-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0);
    }
}

/* 添加点击波纹效果 */
.click-gradient {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(180, 180, 255, 0.2) 40%, rgba(100, 100, 255, 0.1) 70%, rgba(50, 50, 255, 0) 100%);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    pointer-events: none;
    z-index: 4;
}

.glass-component.clicked .click-gradient {
    animation: gradient-ripple 0.6s ease-out;
}

@keyframes gradient-ripple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }

    100% {
        transform: translate(-50%, -50%) scale(3);
        opacity: 0;
    }
}

.glass-component {
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
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