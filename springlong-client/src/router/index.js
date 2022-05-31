import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/User/Login/LoginPage.vue";
import RegistPage from "@/views/User/Regist/RegistPage.vue";
import ChatList from "@/views/Chat/ChatList.vue";
import ChatFriend from "@/views/Chat/ChatFriend.vue";
import ChatMoving from "@/views/Chat/ChatMoving.vue";
const routes = [
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/regist",
    component: RegistPage,
  },
  {
    path: "/",
    component: ChatList,
  },
  {
    path: "/chatfriend",
    component: ChatFriend,
  },
  {
    path: "/chatmoving",
    component: ChatMoving,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
