<template>
  <el-row class="recommendList">
    <el-col :span="24">
      <h3 class="title">
        <i class="fa fa-fire"></i>
        <span>文章推荐</span>
      </h3>
      <ul class="recommend-article-list">
        <li class="article-item" v-for="(item,index) in 10" :key="index">
          <nuxt-link class="link" to="/article/23">{{index+1}}.&nbsp;浅谈Easy-mock 最好的备胎没有之一</nuxt-link>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "recommendList"
};
</script>

<style lang="scss" scoped>
.recommendList {
  background: #fff;
  margin-top: 10px;
  border-radius: 6px;
  height: 310px;
  padding: 20px;
  .recommend-article-list {
    list-style: none;
    padding: 0;
    width: 100%;
    height: 100%;
    .article-item {
      font-size: 14px;
      display: block;
      width: 100%;
      height: 24px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition-duration: 0.5s;
      .link {
        color: #409eff;
        &:hover {
          color: red;
          text-decoration: underline;
        }
      }
    }
  }
  .title {
    font-size: 16px;
    color: #333;
    line-height: 28px;

    .fa-fire {
      color: rgb(192, 3, 3);
    }
  }
}
</style>
