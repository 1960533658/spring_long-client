<template>
  <div class="page-home">首页</div>
</template>
<script>
import { onBeforeMount } from "vue";
import router from "../../router";
import { useStore } from "vuex";

export default {
  name: "HomePage",
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      // 如果Token存在就留在首页，不存在就进入登录页面
      if (!store.state.user.profile.token) {
        router.push("/login");
      }
    });
  },
};
</script>
<style scoped lang="less">
.page-home {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 215, 0, 0.7);
}
</style>
