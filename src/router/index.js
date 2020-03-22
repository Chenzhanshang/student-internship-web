import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import register from '../components/register.vue'
import home from '../components/home.vue'
import userMessage from '../components/userMessage.vue'
import announcement from '../components/announcement.vue'
import teachingMaterial from '../components/teachingMaterial.vue'
import work from '../components/work.vue'
import apply from '../components/apply.vue'
import report from '../components/report.vue'
import task from '../components/task.vue'


import adminHome from '../view/home.vue'
import adminAnnouncement from '../view/announcement.vue'
import feedback from '../view/feedback.vue'
import adminTeachingMaterial from '../view/teachingMaterial.vue'
import adminWork from '../view/work.vue'
import adminApply from '../view/apply.vue'
import adminReport from '../view/report.vue'
import adminUserMessage from '../view/userMessage.vue'
import adminTask from '../view/task.vue'
import userManage from '../view/userManage.vue'


Vue.use(VueRouter)

const routes = [
  {
    name:'/',
    path:'/',
    redirect:'/login'
  },
  {
    name:'/login',
    path:'/login',
    component:login
  },
  {
    name:'/register',
    path:'/register',
    component:register
  },
  {
    name:'/home',
    path:'/home',
    component:home,
    children:[
      {
      path:'userMessage',
      component:userMessage,
      },
      {
      path:'announcement',
      component:announcement,
      },
      {
      path:'teachingMaterial',
      component:teachingMaterial,
      },
      {
      path:'work',
      component:work,
      },
      {
      path:'apply',
      component:apply,
      },
      {
      path:'report',
      component:report,
      },
      {
      path:'task',
      component:task,
      }
    ]
  },
  {
    name:'/adminHome',
    path:'/adminHome',
    component:adminHome,
    children:[
      {
      name:'adminAnnouncement',
      path:'adminAnnouncement',
      component:adminAnnouncement,
      },
      {
      name:'feedback',
      path:'feedback',
      component:feedback,
      },
      {
      name:'adminTeachingMaterial',
      path:'adminTeachingMaterial',
      component:adminTeachingMaterial,
      },
      {
      name:'adminWork',
      path:'adminWork',
      component:adminWork,
      },
      {
      name:'adminApply',
      path:'adminApply',
      component:adminApply,
      },
      {
      name:'adminReport',
      path:'adminReport',
      component:adminReport,
      },
      {
      name:'adminUserMessage',
      path:'adminUserMessage',
      component:adminUserMessage,
      },
      {
      name:'adminTask',
      path:'adminTask',
      component:adminTask,
      },
      {
      name:'userManage',
      path:'userManage',
      component:userManage,
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
