import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./user";
export default createStore({
  plugins: [
    createPersistedState({
      // 数据存储在 localStorage 时的 key
      key: "spring-long-client",
      // 指定将哪些模块中的数据同步到本地
      paths: ["user"],
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});
