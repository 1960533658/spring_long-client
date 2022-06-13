<template>
  <div class="page-home">
    <div class="welcome">
      <h1>
        欢迎用户{{ store.state.user.profile.username }}来到Spring_Long聊天室
      </h1>
      <span class="ambition"
        >立志打造一个充满欢声笑语，不负青春年华的聊天室</span
      >
      <ChatHead />
    </div>
  </div>
</template>
<script>
import { onBeforeMount } from "vue";
import router from "../../router";
import { useStore } from "vuex";
import ChatHead from "../Chat/components/ChatHead.vue";
import { getGoodFriendsList } from "../../api/chat";
import { message } from "ant-design-vue";

export default {
  name: "HomePage",
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      // 如果Token存在就留在首页，不存在就进入登录页面
      if (!store.state.user.profile.token) {
        router.push("/login");
      }
      // 使用从后端获取数据的方式用来测验Token的有效期。
      getGoodFriendsList(store.state.user.profile.id).then((response) => {
        if (response.status === 100) {
          message.warn(response.msg);
          router.push("/login");
        }
      });
    });
    return {
      store,
    };
  },
  components: { ChatHead },
};
</script>
<style scoped lang="less">
.page-home {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 215, 0, 0.4);

  .welcome {
    width: 1240px;
    margin: 0 auto;
    h1 {
      text-align: center;
      padding-top: 100px;
      font-size: 36px;
      color: #02ff89;
      font-weight: 700;
    }
    .ambition {
      display: block;
      text-align: center;
      font-size: 30px;
      color: #ae19c9;
    }
  }
}
</style>
