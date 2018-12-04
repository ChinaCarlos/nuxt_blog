<template>
  <div class="indexContainer">
    <!-- <Pano title="菱歌科技" width="100%" height="100%" bundle="/images/pantry/" format="jpg"></Pano> -->
    <!-- <Pano source="/images/equirectangular.jpg"></Pano> -->
    <main-container>
      <div slot="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in categories"
            :key="item.id"
            :name="item.name"
            :label="item.name"
          ></el-tab-pane>
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
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          class="pagination hidden-sm-and-down"
        ></el-pagination>
      </div>
      <div slot="aside">
        <user-item></user-item>
        <recommend-list></recommend-list>
        <community-list></community-list>
        <contact-list></contact-list>
      </div>
    </main-container>
  </div>
</template>

<script>
import mainContainer from "@/components/common/mainContainer";
import articleItem from "@/components/common/articleItem";
import userItem from "@/components/common/userItem";
import recommendList from "@/components/common/recommendList";
import communityList from "@/components/common/communityList";
import contactList from "@/components/common/contactList";
import { CATEGORY_LIST, ARTICLE_LIST } from "../constant/api";
export default {
  name: "indexpage",
  components: {
    mainContainer,
    articleItem,
    userItem,
    recommendList,
    communityList,
    contactList
  },
  data() {
    return {
      userInfo: {},
      activeName: "",
      categories: []
    };
  },
  comupted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async initData() {
      const res = await this.$axios.get(CATEGORY_LIST);
      if (res.data.code === 0) {
        this.categories = res.data.data;
        this.activeName = this.categories[0].name;
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
    }
  },
  mounted() {
    this.initData();
  },
  layout: "index"
};
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
