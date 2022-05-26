<template>
  <div class="box" :style="{ backgroundColor: BGC }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ChatLayout",
  props: {
    BGC: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="less">
.box {
  height: 700px;
  width: 1250px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
}
</style>
