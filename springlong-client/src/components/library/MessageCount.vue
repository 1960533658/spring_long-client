<template>
  <div class="count">{{ count }}</div>
</template>

<script>
export default {
  name: "MessageCount",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  setup() {},
};
</script>

<style>
.count {
  position: absolute;
  right: -5px;
  top: -5px;
  width: 28px;
  height: 20px;
  background-color: red;
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
</style>
