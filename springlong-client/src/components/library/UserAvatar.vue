<template>
  <div class="user-avatar">
    <div class="normal">
      <span v-if="portrait === 'XXX'" @mouseenter="userAvatarShow">
        <!-- {{ $store.state.user.profile.username[0] }} -->
        {{ username[0] }}
      </span>
      <img src="#" alt="" v-else />
    </div>
    <div
      class="hover-show"
      v-if="userInfoIsShow"
      @mouseleave="userAvatarhiddle"
    >
      <p class="username">{{ username }}</p>
      <p class="user-center">个人中心</p>
      <p class="user-center" @click="logout">退出登录</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue-demi";
import { useRouter } from "vue-router";
export default {
  name: "UserAvatar",
  props: {
    username: {
      type: String,
      default: "",
    },
    portrait: {
      type: String,
      default: "",
    },
    isBar: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const userInfoIsShow = ref(false);
    // 鼠标移入头像 显示选项弹窗
    const userAvatarShow = () => {
      if (!props.isBar) return;
      userInfoIsShow.value = true;
      console.log("进入");
    };
    // 鼠标移出用户选项，隐藏选项弹窗
    const userAvatarhiddle = () => {
      userInfoIsShow.value = false;
    };
    // 退出登录
    const logout = () => {
      router.push("/login");
    };
    return {
      userInfoIsShow,
      userAvatarShow,
      userAvatarhiddle,
      logout,
    };
  },
};
</script>

<style scoped lang="less">
.user-avatar {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  .normal {
    span {
      position: relative;
      z-index: 5;
      display: inline-block;
      height: 50px;
      width: 50px;
      line-height: 50px;
      border-radius: 50%;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      background-color: green;
      color: #fff;
      margin: 0 6px 0 0;
    }
  }
  .hover-show {
    position: absolute;
    left: -25px;
    top: 25px;
    z-index: 2;
    width: 100px;
    height: 200px;
    padding-top: 30px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .username {
      font-size: 16px;
    }
    .user-center {
      // background-color: @priceColor;
      text-align: left;
      padding-left: 10px;
      line-height: 20px;
      margin: 5px 0;
    }
    .user-center:hover {
      color: #ccc;
      background-color: @xtxColor;
    }
  }
}
</style>
