import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router/index' // 引入路由配置文件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

const app = createApp(App)
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  console.log(token)
  if(token){
    config.headers.Authorization = token 
  }
  return config
})
 
app.provide('$axios', axios);
app.use(router);
app.use(ElementPlus)

router.beforeEach(function (to, from, next) {
    if (to.meta.needLogin) {
        if (localStorage.getItem('access_token')) {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    } else {
        next();
    }
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
