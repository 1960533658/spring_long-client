<template>
  <div class="select">
    <router-link to="/" class="chat-list">聊天列表</router-link>
    <router-link to="/chatfriend" class="chat-friend">联系人</router-link>
    <router-link to="/chatmoving" class="chat-moving">动态</router-link>
    <span class="avatar-box">
      <UserAvatar :username="username" :portrait="portrait" />
    </span>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "ChatHead",
  setup() {
    const store = useStore();
    const { username, portrait } = store.state.user.profile;
    return {
      username,
      portrait,
    };
  },
};
</script>

<style scoped lang="less">
.select {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0 10px;
  height: 100px;
  text-align: center;
  a {
    display: inline-block;
    width: 20%;
    text-align: center;
    margin-right: 10px;
    height: 90px;
    line-height: 90px;
    border-radius: 10px;
    font-size: 30px;
    font-weight: 700;
    background-color: gold;
    cursor: pointer;
    transition: 0.5s linear;
  }
  a:hover {
    box-shadow: 0 10px 15px @xtxColor;
    cursor: pointer;
    transition: 0.5s linear;
  }
  .chat-list {
    margin-left: 10px;
  }
  .avatar-box {
    position: absolute;
    right: 300px;
    top: 30px;
  }
}
</style>
