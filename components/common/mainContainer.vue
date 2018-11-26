<template>
  <el-row :gutter="50" class="contain">
    <el-col :span="18" :xs="24" class="main">
      <div class="main-section">
        <slot name="container"></slot>
      </div>
    </el-col>
    <el-col :span="6" class="aside">
      <div class="hidden-sm-and-down aside-section">
        <slot name="aside"></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'mainContainer'
}
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: auto;
  margin-left: 0 !important;
  margin-right: 0 !important;

  .main-section {
    background: #fff;
    height: auto;
    min-height: 500px;
    border-radius: 4px;
    padding: 20px;
    position: relative;
  }

  .aside-section {
    height: auto;
    position: relative;
  }
}
</style>
