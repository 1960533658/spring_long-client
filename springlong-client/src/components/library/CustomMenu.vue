<template>
  <div
    class="custom-menu"
    :style="{
      top: $store.state.rightMenuPosition.y + 'px',
      left: $store.state.rightMenuPosition.x + 'px',
    }"
  >
    <slot name="chatFriend"></slot>
  </div>
</template>

<script>
export default {
  name: "CustomMenu",
  setup() {},
};
</script>

<style scoped lang="less">
.custom-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  padding: 10px 0;
  background-color: #2a2424;
  border-radius: 10px;
  overflow: hidden;
}
</style>
