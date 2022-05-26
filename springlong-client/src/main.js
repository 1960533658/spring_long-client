import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 导入样式重置
import "normalize.css";
// 导入公共样式
import "@/assets/styles/common.less";
// 导入全局组件、指令模块
import library from "./components/library";
// // 导入socket.io-client
// import socketIo from "socket.io-client";
// import VueSocketIO from "vue-3-socket.io";
// import { io } from "socket.io-client";
// const socketio = new VueSocketIO({
//   debug: true,
//   connection: io('http://localhost:3000', { transports: ['websocket'] }),
//   //http:自己的服务：端口
//   extraHeaders: { "Access-Control-Allow-Origin": '*' },
// })
/* */
createApp(App).use(store).use(message).use(router).use(library).mount("#app");
