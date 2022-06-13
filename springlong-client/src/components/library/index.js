// 导入自定义指令
import focus from "../directives/focus.js";
import height5 from "../directives/height5.js";
// 获取模块路径集合 模块导入函数
const importFn = require.context("./", false, /\.vue$/);
const keys = importFn.keys();
const library = {
  install(app) {
    app.directive("focus", focus);
    app.directive("height5", height5);
    // 遍历模块集合 添加全局组件
    keys.forEach((item) => {
      const component = importFn(item).default;
      app.component(component.name, component);
    });
  },
};

export default library;
