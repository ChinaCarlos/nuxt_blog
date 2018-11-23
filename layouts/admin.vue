<template>
  <el-container class="page">
    <el-header class="app-header-box">
      <app-header />
    </el-header>
    <el-container>
      <el-main>
        <nuxt></nuxt>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import appHeader from '../components/common/appHeader'
export default {
  components: {
    appHeader
  }
}
</script>

<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.page {
  width: 100%;
  min-height: 100%;
  padding-top: 60px;
  overflow-y: auto;

  .app-header-box {
    background: rgb(245, 244, 244);
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 0;
    box-shadow: 0px 0px 5px #23222299;
  }

  .app-main-box {
    width: 100%;
    height: auto;
    position: relative;
  }
}
</style>
