<template>
  <div class="page">
    <el-container>

      <el-aside width='200px'>
        <app-aside></app-aside>
      </el-aside>
      <el-container>
        <el-header class="headerContainer">
          <app-header></app-header>
        </el-header>
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import appHeader from '@/components/common/appHeader';
import appAside from '@/components/common/appAside';
export default {
  components: {
    appHeader,
    appAside
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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.headerContainer {
  padding: 0;
  margin: 0;
  border-bottom: 2px solid #eee;
  box-shadow: 35px -21px 66px black;
}
</style>
