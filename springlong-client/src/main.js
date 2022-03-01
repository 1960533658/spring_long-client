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
/* */
createApp(App).use(store).use(message).use(router).use(library).mount("#app");
