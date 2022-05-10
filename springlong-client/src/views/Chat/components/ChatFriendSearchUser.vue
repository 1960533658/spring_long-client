<template>
  <div class="popup">
    <div class="warpper">
      <h2>{{ popUpWindowType }}</h2>
      <div class="close" @click="handleClose">
        <span>+</span>
      </div>
      <div class="tag">
        <ItemTag :searchFriendData="searchFriendData" fromWhere="fromSearch" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: {
    popUpWindowType: {
      type: String,
      default: "",
    },
    searchFriendData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const store = useStore();
    //#region  关闭弹窗
    const handleClose = () => {
      store.commit("showSearchValueModle");
    };
    //#endregion
    return {
      handleClose,
    };
  },
};
</script>

<style scoped lang="less">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(131, 129, 129, 0.7);

  .warpper {
    position: relative;
    padding-top: 20px;
    padding-right: 20px;
    width: 1200px;
    height: 500px;
    margin: 230px auto 0;
    background-color: hotpink;
    border-radius: 10px;

    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 28px;
      color: #fff;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      background-color: red;
      border-top-right-radius: 10px;
      font-size: 30px;
      text-align: center;
      line-height: 25px;
      cursor: pointer;

      span {
        display: inline-block;
        transform: rotate(40deg);
        margin-left: 3px;
        font-weight: 700;
      }
    }
  }
}
</style>
