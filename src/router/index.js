import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'
import Index from '../components/Index.vue'
import NewArticle from '../components/NewArticle.vue'
import ArticleManage from '../components/ArticleManage.vue'
import EditArticle from '../components/EditArticle.vue'


const routes = [
  // {
  //   path: '/index',
  //   component: Index,
  //   meta: {
  //     needLogin: true
  //   }
  // },
  {
    path: '/',
    redirect: '/home',
    component: Index,
    children: [{
      path: '/home',
      component: Home,
      meta: {
        needLogin: true
      }

    },
    {
      path: '/articleManage',
      component: ArticleManage,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/newArticle',
      component: NewArticle,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/editArticle',
      component: EditArticle,
      meta: {
        needLogin: true
      }
    }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      needLogin: false
    }
  },

  {
    path: '/NotFound',
    component: NotFound,
    meta: {
      needLogin: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router