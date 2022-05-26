import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// import { getGoodFriendsList } from "../api/chat";
import user from "./user";
import chatList from "./chatList";
export default createStore({
  plugins: [
    createPersistedState({
      // 数据存储在 localStorage 时的 key
      key: "spring-long-client",
      // 指定将哪些模块中的数据同步到本地
      paths: ["user"],
    }),
  ],
  state: {
    // 弹窗的显示与否
    searchValuehModle: false,
    // 弹窗组件的类型
    popUpWindowType: "",
    // 弹窗标签页数据1
    tagData1: [],
    // 弹窗标签页数据2
    tagData2: [],
    // 右键菜单是否显示
    rightMenuIsShow: false,
    rightMenuUserId: null,
    rightMenuPosition: {
      x: 0,
      y: 0,
    },
    // 好友列表数据
    goodFriendsListData: [],
  },
  mutations: {
    // 控制搜索弹窗的显示与否
    showModle(state, payload) {
      state.searchValuehModle = payload;
    },
    // 更新弹窗类型
    updataPopUpWindowType(state, payload) {
      state.popUpWindowType = payload;
    },
    // 更新弹窗标签页数据
    updataTagData(state, payload) {
      if (payload.type === "apply") {
        state.tagData1 = payload.myApply;
        state.tagData2 = payload.applyToMe;
      } else {
        state.tagData1 = payload;
      }
    },
    // 关闭弹窗清空tagData
    restoreDefaultData(state) {
      state.tagData1.length = 0;
      state.tagData2.length = 0;
      state.popUpWindowType = "";
    },
    // 清除tagData2的一条数据
    delTagData2One(state, payload) {
      state.tagData2 = state.tagData2.filter((item) => item.id != payload);
    },
    // 显示自定义的菜单弹窗
    showRightMenu(state, payload) {
      const { id, isShow, rightMenuPosition } = payload;
      state.rightMenuUserId = id;
      state.rightMenuIsShow = isShow;
      state.rightMenuPosition = rightMenuPosition;
    },
    // 获取更新好友列表数据
    getGoodFriend(state, data) {
      state.goodFriendsListData = data;
    },
    // 通过对方id删除好友列表中的数据
    deleteGoodFriend(state, payload) {
      state.goodFriendsListData = state.goodFriendsListData.filter((item) => {
        return item.id !== payload;
      });
    },
  },
  actions: {
    dispatchUpdataTagData(context, payload) {
      context.commit("updataTagData", payload);
    },
  },
  modules: {
    user,
    chatList,
  },
});
