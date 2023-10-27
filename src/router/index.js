import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import index from '@/components/tab/mainPage/index.vue'
import exceptionFeature from '@/components/tab/knowledge/exceptionFeature.vue'
import datasets from '@/components/tab/manageData/datasets.vue'
import dataManage from '@/components/tab/manageData/dataManage.vue'
import models from '@/components/tab/manageModel/models.vue'

import trainModel from '@/components/tab/train_model/page.vue'
import predictDisease from '@/components/tab/disease_predict/page.vue'

import Login from "@/components/tab/login/login.vue"
import Register from "@/components/tab/login/register.vue"

import SoftwareIntro from "@/components/tab/SoftwareIntro.vue";
import ColumnManage from "@/components/tab/columnManage/columnManage.vue";
import columnManageIndex from "@/components/tab/columnManage/index.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/sideBar", //有登录页面时加上

    name: "SideBar",
    redirect: "/SoftwareIntro",
    component: SideBar,
    children: [
      {
        path: "/dash",
        name: "dash",
        component: index,
      },
      // {
      //   path: "/datasets",
      //   name: "dataset",
      //   component: datasets,
      // },
      {
        path: "/dataManage",
        name: "dataManage",
        component: dataManage,
      },
      {
        path: "/models",
        name: "models",
        component: models,
      },
      
      {
        path: "/knowledge",
        name: "knowledge",
        component: exceptionFeature,
      },
      {
        path: "/train",
        name: "train",
        component: trainModel,
      },
      {
        path: "/pred",
        name: "pred",
        component: predictDisease,
      },
      {
        path: "/SoftwareIntro",
        name: "SoftwareIntro",
        component: SoftwareIntro,
      },
      {
        path: "/columnManageIndex",
        name: "columnManageIndex",
        component: columnManageIndex,
      },
      {
        path: "/columnManage",
        name: "columnManage",
        component: ColumnManage,
      },

    ],
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,

  },


];

const router = new VueRouter({
  routes
})
export default router
