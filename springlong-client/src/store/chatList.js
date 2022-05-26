export default {
  namespaced: true,
  state() {
    return {
      chatWindow: {
        selectedId: undefined,
        title: "aaaa",
        chatRoom: "",
      },
    };
  },
  mutations: {
    // 用户修改聊天窗口的 好友用户名称
    setChatWindowTitle(state, payload) {
      state.chatWindow.title = payload;
    },
    // 用户修改当前选中的好友的 id
    setSelectedId(state, payload) {
      state.chatWindow.selectedId = payload;
    },
    // 修改用户选择的房间名
    setChatRoom(state, payload) {
      state.chatWindow.chatRoom = payload;
    },
    setChatWindow(state, payload) {
      state.chatWindow = {
        selectedId: payload.id,
        title: payload.username,
        chatRoom: payload.chatRoom,
        portrait: payload.portrait,
      };
    },
  },
  actions: {},
  getters: {
    getSelectedId(state) {
      return state.chatWindow.selectedId;
    },
  },
};
