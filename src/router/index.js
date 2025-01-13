import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'
import Index from '../components/Index.vue'
import NewArticle from '../components/NewArticle.vue'
import ArticleManage from '../components/ArticleManage.vue'
import EditArticle from '../components/EditArticle.vue'
import publishCenter from '../components/publish.center.vue'


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
    name: "index",
    component: Index,
    meta: {
      needLogin: true,
      title: '首页'
    },
    children: [{
      path: '/home',
      component: Home,
      name: 'home',
      meta: {
        needLogin: true,
        title: '首页'
      }
    },
    {
      path: '/articleManage',
      component: publishCenter,
      redirect: '/articleManage',
      name: "文章管理",
      meta: {
        needLogin: true,
        title: "文章管理"
      },
      children: [
        {
          path: '/articleManage',
          component: ArticleManage,
          name: "文章管理",
          meta: {
            needLogin: true,
            title: "文章管理"
          }
        },
        {
          path: '/newArticle',
          component: NewArticle,
          name: "newArticle",
          meta: {
            needLogin: true,
            title: "新建文章"
          }
        },
        {
          path: '/editArticle',
          component: EditArticle,
          name: 'editArticle',
          meta: {
            needLogin: true,
            title: "编辑文章"
          }
        }
      ]
    },
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
  history: createWebHistory("management"),
  routes
})

export default router