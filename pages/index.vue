<template>
  <div class="indexContainer">
    <!-- <Pano title="菱歌科技" width="100%" height="100%" bundle="/images/pantry/" format="jpg"></Pano> -->
    <!-- <Pano source="/images/equirectangular.jpg"></Pano> -->
    <main-container>
      <div slot="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="Vue" name="second"></el-tab-pane>
          <el-tab-pane label="React" name="React"></el-tab-pane>
          <el-tab-pane label="Golang" name="Golang"></el-tab-pane>
          <el-tab-pane label="CSS3" name="CSS3"></el-tab-pane>
          <el-tab-pane label="Javascript" name="Javascript"></el-tab-pane>
          <el-tab-pane label="HTML5" name="HTML5"></el-tab-pane>
          <el-tab-pane label="Angular" name="fourth"></el-tab-pane>
        </el-tabs>
        <!-- 文章列表 -->
        <el-row>
          <el-col>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
            <article-item></article-item>
          </el-col>
        </el-row>
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="1000" class="pagination hidden-sm-and-down">
        </el-pagination>
      </div>
      <div slot="aside">aside</div>
    </main-container>
  </div>
</template>

<script>
import mainContainer from '@/components/common/mainContainer'
import articleItem from '@/components/common/articleItem'
export default {
  name: 'indexpage',
  components: {
    mainContainer,
    articleItem
  },
  data() {
    return {
      userInfo: {},
      activeName: 'second'
    }
  },
  comupted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  layout: 'index'
}
</script>

<style lang="scss" scoped>
.indexContainer {
  width: 100%;
  min-height: 100%;

  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
