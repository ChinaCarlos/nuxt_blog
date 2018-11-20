<template>
  <el-menu
    default-active="1"
    class="app-header-menu"
    mode="horizontal"
    background-color="#6f67ef"
    text-color="#fff"
    active-text-color="#fff"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
  </el-menu>

</template>

<script>
export default {
  name: 'appHeader'
}
</script>

<style lang="scss" scoped>
.app-header-menu {
  padding: 0 50px;
}
</style>
