/**
 * 限制元素最大宽度为500px
 */
const height5 = {
  mounted(el) {
    if (el.offsetWidth > 500) {
      el.style.width = "500px";
    }
  },
};
export default height5;
