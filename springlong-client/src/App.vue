<template>
  <router-view />
</template>
<script>
// import { useStore } from "vuex";

export default {
  setup() {
    // const store = useStore();
    // const onHandle = () => {
    // store.commit("user/setUser", { token: "test" });
    // };
    // return {
    //   onHandle,
    // };
    // 判断是否拥有token 如果拥有在首页 没有则跳转到login
    // console.log(store);
  },
};
</script>
<style lang="less">
html {
  body {
    height: 100%;
    box-sizing: border-box;
    background-image: url("~@/assets/image/bg2.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;

    template {
      display: block;
    }
  }
}
</style>
