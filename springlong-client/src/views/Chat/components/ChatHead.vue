<template>
  <div class="select">
    <router-link to="/chatlist" class="chat-list">聊天列表</router-link>
    <router-link to="/chatfriend" class="chat-friend">联系人</router-link>
    <router-link to="/chatmoving" class="chat-moving">动态</router-link>
  </div>
</template>
<script>
export default {
  name: "ChatHead",
};
</script>

<style scoped lang="less">
.select {
  display: flex;
  width: 1250px;
  margin: 5px auto 10px;

  a {
    flex: 1;
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
    font-size: 40px;
    box-shadow: 0 10px 15px @xtxColor;
    cursor: pointer;
    transition: 0.5s linear;
  }
  .chat-list {
    margin-left: 10px;
  }
}
</style>
