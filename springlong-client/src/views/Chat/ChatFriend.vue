<template>
  <div class="page-chat-friend">
    <h1 class="">这里是您的联系人，与你共同度过这似水年华的人</h1>
    <div class="icon">
      <PlusOutlined v-if="!isSearch" @click="onSearch" />
      <input
        v-else
        type="text"
        placeholder="添加新好友"
        v-focus
        @blur="onSearchOver"
      />
    </div>
  </div>
</template>

<script>
import { PlusOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
export default {
  name: "ChatFriend",
  components: {
    PlusOutlined,
  },
  setup() {
    const isSearch = ref(false);
    const onSearch = () => {
      isSearch.value = true;
    };
    const onSearchOver = () => {
      isSearch.value = false;
    };
    return {
      isSearch,
      onSearch,
      onSearchOver,
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
.icon {
  cursor: pointer;
  input {
    position: absolute;
    height: 35px;
    top: 8px;
    right: 0;
    margin-right: 6px;
    padding-left: 10px;
    border: 1px solid #cfcdcd;
    border-radius: 5px;
    line-height: 35px;
    font-size: 20px;
  }
  :deep(.anticon) {
    position: absolute;
    top: 8px;
    right: 0;
    margin-right: 6px;
    font-size: 36px;
    transition: 0.3s linear;
  }
  :deep(.anticon):hover {
    transform: rotate(90deg);
    transition: 0.3s linear;
  }
}
</style>
