<template>
  <div class="page">
    <el-container class="index-layout">
      <el-header class="index-layout-header">
        <index-header></index-header>
      </el-header>
      <el-main class="index-layout-main" id="main">
        <nuxt></nuxt>
      </el-main>
    </el-container>
    <scroll-to-top @scrollToTop="scrollToTop"></scroll-to-top>
  </div>
</template>

<script>
import indexHeader from '~/components/common/indexHeader'
import scrollToTop from '@/components/common/scrollToTop'

export default {
  components: {
    indexHeader,
    scrollToTop
  },
  methods: {
    scrollToTop() {
      let timer = null
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        let top = document.querySelector('#main').scrollTop
        if (top > 0) {
          document.querySelector('#main').scrollTop = top - 50
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background: #eee;

  .index-layout {
    width: 100%;
    height: 100%;
    padding-top: 60px;

    .index-layout-header {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      padding: 0;
      margin: 0;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }

    .index-layout-main {
      min-height: 100%;
      height: 100%;
      width: 100%;
      position: relative;
    }
  }
}
</style>
