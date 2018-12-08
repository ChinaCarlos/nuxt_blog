<template>
  <div class="indexContainer">
    <!-- <Pano title="菱歌科技" width="100%" height="100%" bundle="/images/pantry/" format="jpg"></Pano> -->
    <!-- <Pano source="/images/equirectangular.jpg"></Pano> -->
    <main-container>
      <div slot="container">
        <el-tabs v-model="activeCategory" @tab-click="changeCategory">
          <el-tab-pane key="all" name="all" label="全部"></el-tab-pane>
          <el-tab-pane v-for="item in categories" :key="item.id" :name="item.id" :label="item.name"></el-tab-pane>
        </el-tabs>
        <!-- 文章列表 -->
        <el-row v-loading="loading">
          <transition name="el-fade-in">
            <el-col v-show="articlesList.length">
              <article-item v-for="articleItem in articlesList" :key="articleItem.id"></article-item>
            </el-col>
          </transition>
          <el-col v-show="!articlesList.length" class="none-article">
            <i class="fa fa-smile-o"></i>&nbsp;暂无该类文章
          </el-col>
        </el-row>
        <!-- 分页 -->
        <el-pagination
          v-show="articlesList.length"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="size"
          :current-page="page"
          class="pagination hidden-sm-and-down"
          @current-change="changePagination"
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
import {
  GET_INDEX_CATEGORY_LIST,
  GET_INDEX_ARTICLE_LIST
} from "../constant/api";
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
      activeCategory: "all",
      categories: [],
      articlesList: [],
      loading: true,
      page: 1,
      size: 10,
      total: 1
    };
  },
  comupted() {},
  methods: {
    // 获取类别
    async getCategories() {
      const res = await this.$axios.get(GET_INDEX_CATEGORY_LIST);
      if (res.data.code === 0) {
        this.categories = res.data.data;
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
    },
    // 获取文章
    async getArticleLists(category = "", page = 1, size = 10, keywords = "") {
      const res = await this.$axios.get(GET_INDEX_ARTICLE_LIST, {
        params: {
          category,
          page,
          size,
          keywords
        }
      });
      if (res.data.code === 0) {
        this.articlesList = res.data.data;
        this.total = res.data.total;
        this.size = res.data.size;
        this.page = res.data.page;
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
    },
    // 改变文章的类型
    async changeCategory(tab) {
      this.loading = true;
      this.activeCategory = tab.name;
      let category = this.activeCategory;
      await this.getArticleLists(category, 1, 10);
      this.loading = false;
    },
    // 翻页
    async changePagination(page) {
      console.log(page);
      this.loading = true;
      await this.getArticleLists(
        this.activeCategory,
        page,
        10,
        (keywords = "")
      );
      this.loading = false;
    },
    // 初始化数据
    async initData() {
      this.loading = true;
      await this.getCategories();
      await this.getArticleLists();
      this.loading = false;
    }
  },
  async mounted() {
    await this.initData();
  },
  layout: "index"
};
</script>

<style lang="scss" scoped>
.indexContainer {
  width: 100%;
  min-height: 100%;
  .none-article {
    height: 400px;
    font-size: 30px;
    color: #ccc;
    text-align: center;
    line-height: 400px;
  }
  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
