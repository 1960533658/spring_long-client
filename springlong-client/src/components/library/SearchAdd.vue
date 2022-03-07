<template>
  <div class="icon">
    <PlusOutlined v-if="!isSearch" @click="onSearch" />
    <input
      v-else
      type="text"
      placeholder="添加新好友"
      v-focus
      @blur="onSearchOver"
      @input="onInput($event)"
    />
    <button>test</button>
  </div>
</template>

<script>
import { PlusOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
export default {
  name: "SearchAdd",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  components: {
    PlusOutlined,
  },
  setup(props, { emit }) {
    let search = useVModel(props, "modelValue", emit);
    // 控制是否显示搜索框
    const isSearch = ref(false);
    // 当点击字体图标就显示输入框
    const onSearch = () => {
      isSearch.value = true;
    };
    // 当输入框失焦就让输入框消失
    const onSearchOver = () => {
      isSearch.value = false;
    };
    // 使用vue/use进行双向数据绑定
    // 输入框输入时改变值
    const onInput = (event) => {
      search.value = event.target.value;
    };
    return {
      isSearch,
      onSearch,
      onSearchOver,
      onInput,
      search,
    };
  },
};
</script>

<style scoped lang="less">
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
    right: 60px;
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
