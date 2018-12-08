<template>
  <el-button @click="scrollToTop" class="scroll-to-top" type="primary" circle>
    <i class="fa fa-arrow-circle-up"></i>
  </el-button>
</template>

<script>
export default {
  name: "scrollToTop",
  methods: {
    scrollToTop() {
      this.$emit("scrollToTop");
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 999999;
  .fa-arrow-circle-up {
    font-size: 14px;
  }
}
</style>
