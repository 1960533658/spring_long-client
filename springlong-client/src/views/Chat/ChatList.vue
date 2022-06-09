<template>
  <div class="page-chat-list">
    <div class="title">
      <h1>海内存知己——天涯若比邻</h1>
    </div>
    <ChatHead />
    <ChatLayout :BGC="BGC">
      <main>
        <h2 class="fl">{{ $store.state.chatList.chatWindow.title }}</h2>
        <aside class="left">
          <RetrenchItem
            :data="chatListData"
            v-model:chatRecordsData="chatRecordsData"
          />
        </aside>
        <article class="right">
          <!-- :chatRecordsData="chatRecordsData" -->
          <ChatInputBox
            :dataLength="chatListData.length"
            v-model:chatRecordsData="chatRecordsData"
          />
        </article>
      </main>
    </ChatLayout>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import ChatLayout from "./components/ChatLayout.vue";
import ChatHead from "./components/ChatHead.vue";
import { useStore } from "vuex";
import { getGoodFriendsChatList, getSelectedChatRecores } from "../../api/chat";
import ChatInputBox from "./components/ChatInputBox.vue";
import { message } from "ant-design-vue";
import routerPush from "../../router";

export default {
  name: "ChatList",
  setup() {
    const num = ref(1);
    // 主要内容背景色
    const BGC = "rgba(96, 110, 104, 0.5)";
    // 获取Vuex中自己的 Id
    const store = useStore();
    const myId = store.state.user.profile.id;
    //#region  当进入页面时获取好友列并渲染
    // 存储好友聊天列表数据
    const chatListData = ref([]);
    // 存储好友聊天数据
    const chatRecordsData = ref({});
    onBeforeMount(() => {
      // 获取好友列表数据
      getGoodFriendsChatList(myId).then((response) => {
        if (response.status === 200) {
          // 用于修改数据结构 添加一个房间名称 格式 chatRoom`minId`&`maxId`
          response.chatList.map((item) => {
            const maxId = Math.max(myId, item.id);
            const minId = Math.min(myId, item.id);
            const chatRoom = `chat${minId}&${maxId}`;
            console.log(chatRoom);
            item.chatRoom = chatRoom;
          });
          console.log(response);
          chatListData.value = response.chatList;
          if (!response.chatList[0]) return;
          // 更新 vuex~chatList模块中的 聊天窗数据
          store.commit("chatList/setChatWindow", response.chatList[0]);
          // 当获取到用户数据之后获取默认第一个好友列表的聊天数据
          getSelectedChatRecores(response.chatList[0].chatRoom).then(
            (response) => {
              console.log("用户聊天历史记录", response);
              if (response.status === 200) {
                chatRecordsData.value = response.data;
              }
            }
          );
          // 当token验证过期或没有 就跳转到登录页面
        } else if (response.status === 100) {
          message.warn(response.msg);
          routerPush.push("/login");
        }
      });
    });
    //#endregion
    // 获取router传递id
    const router = useRoute();
    console.log(router.query.id);
    return {
      BGC,
      chatListData,
      chatRecordsData,
      num,
    };
  },
  components: { ChatLayout, ChatHead, ChatInputBox },
};
</script>

<style scoped lang="less">
.page-chat-list {
  width: 100%;
  height: 100%;
  background-color: #ffeb6966;

  .title {
    padding-top: 100px;
    margin-bottom: 20px;

    h1 {
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      color: #751cd4;
    }
  }
  main {
    height: 100%;
    border-top-left-radius: 10px;
    text-align: center;
    background-color: #9374e9;

    h2 {
      width: 100%;
      height: 40px;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    aside {
      display: inline-block;
      width: 13%;
      height: calc(100% - 40px);
      vertical-align: top;
    }

    article {
      display: inline-block;
      position: relative;
      width: 87%;
      height: calc(100% - 40px);
      vertical-align: top;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
