import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // meta: { keepAlive: true }
  },
  {
    path: "/AddStudent",
    name: "AddStudent",
    component: () => import(/* webpackChunkName: "about" */ "../views/AddStudent.vue"),
  },
  {
    path: "/Chart",
    name: "Chart",
    component: () => import(/* webpackChunkName: "about" */ "../views/Chart.vue"),
    // meta: { keepAlive: true }
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router;
