<template>
  <ul>
    <li
      v-for="(item, index) in data"
      :key="item.id"
      @mouseenter="preSelection(index)"
      @mouseleave="cancelPreSelection"
      :class="{
        active: index === enterIndex,
        preselection: index === preSelecttionIndex,
      }"
      @click="enterSelect(index, item)"
    >
      <span>{{ item.username[0] }}</span>
      <i>{{ item.username }}</i>
    </li>
    <li v-if="data.length === 0" class="null">无聊天列表数据</li>
  </ul>
</template>

<script>
import { ref } from "vue-demi";
import { useStore } from "vuex";
import { getSelectedChatRecores } from "../../api/chat";
export default {
  name: "RetrenchItem",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    chatRecordsData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    // 选中的项目 的 index
    const enterIndex = ref(0);
    // 预选中（鼠标悬停） 的位置的 index
    const preSelecttionIndex = ref(0);
    const preSelection = (index) => {
      preSelecttionIndex.value = index;
    };
    // 取消预选 index恢复为默认值
    const cancelPreSelection = () => {
      preSelecttionIndex.value = null;
    };
    // 确认点击选中当前项
    const enterSelect = (index, item) => {
      enterIndex.value = index;
      // 选中当前项之后给 vuex~chatList模块中的chatWindow更新当前项的所有选中数据
      store.commit("chatList/setChatWindow", item);
      // 选中之后通过 item.chatRoom 获取和对方聊天的数据
      getSelectedChatRecores(item.chatRoom).then((response) => {
        if (response.status === 200) {
          emit("update:chatRecordsData", response.data);
        }
      });
    };
    return {
      preSelecttionIndex,
      enterIndex,
      preSelection,
      cancelPreSelection,
      enterSelect,
    };
  },
};
</script>

<style scoped lang="less">
li {
  padding: 5px 0 5px 5px;
  span,
  i {
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  span {
    width: 30px;
    border-radius: 50%;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    background-color: green;
    color: #fff;
    margin: 0 6px 0 0;
  }
  i {
    font-size: 18px;
  }
  &:hover {
    cursor: pointer;
  }
  &.active {
    border-right: 1px solid #ccc;
  }
  &.null {
    padding-top: 15px;
    color: #ccc;
  }
}
.preselection {
  background-color: rgba(135, 206, 235, 0.3);
}
.active {
  background-color: rgba(255, 255, 255, 0.8) !important;
}
</style>
