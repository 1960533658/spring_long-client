import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/Home/HomePage.vue";
import LoginPage from "@/views/User/Login/LoginPage.vue";
import RegistPage from "@/views/User/Regist/RegistPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/regist",
    component: RegistPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
