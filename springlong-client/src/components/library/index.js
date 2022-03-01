// 获取模块路径集合 模块导入函数
const importFn = require.context("./", false, /\.vue$/);
const keys = importFn.keys();
const library = {
  install(app) {
    // 遍历模块集合 添加全局组件
    keys.forEach((item) => {
      const component = importFn(item).default;
      app.component(component.name, component);
    });
  },
};

export default library;
