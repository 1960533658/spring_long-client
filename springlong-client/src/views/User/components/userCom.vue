<template>
  <div class="page-login">
    <slot></slot>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "userCom",
};
</script>
<style scoped lang="less">
.page-login {
  margin: 260px auto 0;
  // background-color: #ccc;
  width: 500px;
  height: fit-content;
  background-color: rgba(135, 206, 235, 0.5);
  padding: 0 0 40px;
  border-radius: 10px;
}
</style>
