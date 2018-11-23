<template>
  <el-menu default-active="1" mode="horizontal" background-color="#545c64" text-color="#fff" class="header-menu-list" active-text-color="#ffd04b">
    <div class="index-header-logo">
      <el-menu-item index="1">处理中心</el-menu-item>
      <div class="search-box">
        <el-input placeholder="关键词" class="search">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <div class="index-header-right">
      <el-menu-item index="2">首页</el-menu-item>
      <el-menu-item index="3">关于我们</el-menu-item>
      <el-menu-item index="4">API接入</el-menu-item>
      <el-menu-item index="5">注册</el-menu-item>
      <el-menu-item index="6">登录</el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: 'indexHeader'
}
</script>

<style lang="scss" scoped>
.header-menu-list {
  width: 100%;
  height: 100%;

  .index-header-logo {
    width: auto;
    height: 100%;
    float: left;
    overflow: hidden;
    padding-left: 20px;

    .search-box {
      display: inline-block;
      .search {
        input {
        }
      }
      input {
        height: 30px !important;
        border-radius: 50% !important;
      }
    }

    .el-menu-item {
      display: inline-block;
    }
  }

  .index-header-right {
    width: auto;
    height: 100%;
    float: right;
    padding-right: 50px;

    .el-menu-item {
      display: inline-block;
    }
  }
}
</style>
