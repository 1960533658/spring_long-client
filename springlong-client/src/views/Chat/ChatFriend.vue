<template>
  <div class="page-chat-friend">
    <h1 class="">这里是您的联系人，与你共同度过这似水年华的人</h1>
    <SearchAdd v-model="searchValue" />
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
export default {
  name: "ChatFriend",
  setup() {
    const searchValue = ref("");
    onUpdated(() => {
      console.log(searchValue.value);
    });
    return {
      searchValue,
    };
  },
};
</script>

<style scoped lang="less">
.page-chat-friend {
  position: relative;
  width: calc(100% - 200px);
  height: calc(100% - 200px);
  margin: 100px;

  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
  }
}
</style>
