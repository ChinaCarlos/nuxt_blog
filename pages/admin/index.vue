<template>
  <div class="admin">
    <el-row>
      <el-col class="title-box" :span="19">
        <span class="title-label">文章标题：</span>
        <el-input placeholder="文章标题" size="small" class="title-input" v-model="title"></el-input>
      </el-col>
      <el-col :span="6">
        <span class="label-text">文章分类：</span>
        <el-select el-select v-model="defaultCategory" placeholder="请选择文章分类" size="small">
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <span class="label-text">文章标签：</span>
        <el-select
          el-select
          v-model="defaultTag"
          style="width:70%"
          placeholder="请选择文章标签"
          size="small"
          multiple
          :multiple-limit="4"
        >
          <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
        </el-select>
        <el-button type="primary" circle size="small" @click="toggleOpenTagModal">
          <i class="fa fa-plus"></i>
        </el-button>
        <!-- 添加标签 -->
        <el-dialog title="新建标签" :visible.sync="addTagModal">
          <el-form>
            <el-form-item label="标签名称" label-width="100">
              <el-input v-model="tagName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toggleOpenTagModal">取 消</el-button>
            <el-button type="primary" @click="addTags">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
      <el-col :span="6">
        <span class="label-text">是否发布：</span>
        <el-select el-select v-model="isPublish" placeholder="文章是否发布" size="small">
          <el-option label="发布" :value="true"></el-option>
          <el-option label="保存草稿" :value="false"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="edit-article-area">
        <no-ssr>
          <mavon-editor :toolbars="markdownOption" v-model="handbook" class="mavon-edit" ref="md"/>
        </no-ssr>
      </el-col>
      <el-col :span="2" :offset="22" class="operator">
        <el-button type="primary" @click="saveArticle">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  GET_INDEX_CATEGORY_LIST,
  TAG_LIST,
  TAG_ADD,
  ARTICLE_ADD
} from "../../constant/api";
const STORE_PATH = `modules/Auth/`;
export default {
  name: "index",
  layout: "index",
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      title: "",
      handbook: "#### Nuxt_blog",
      categories: [],
      tags: [],
      defaultTag: [],
      defaultCategory: "",
      tagName: "",
      isPublish: false,
      addTagModal: false
    };
  },
  methods: {
    getUser() {
      let userStr = localStorage.getItem("nuxt_user");
      let user = JSON.parse(userStr) || this.$store.state.modules.Auth.userInfo;
      return user;
    },
    toggleOpenTagModal() {
      this.addTagModal = !this.addTagModal;
    },
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
    async getTags() {
      const user = this.getUser();
      const res = await this.$axios.get(TAG_LIST, {
        params: {
          userId: user.id,
          page: 1,
          size: 9999
        }
      });
      if (res.data.code === 0) {
        this.tags = res.data.data;
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    async addTags() {
      if (!this.tagName) {
        this.$message({
          type: "error",
          message: "标签名称不能为空！"
        });
        return false;
      }
      const user = this.getUser();
      const res = await this.$axios.post(TAG_ADD, {
        user: user.id,
        name: this.tagName
      });
      if (res.data.code === 0) {
        this.addTagModal = false;
        this.$message({
          type: "success",
          message: "添加标签成功！！"
        });
        await this.getTags();
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    async saveArticle() {
      this.$nextTick(async () => {
        let md = this.$refs.md;
        let markdown = md.d_value;
        let content = md.d_render;
        console.log(this.title, this.defaultCategory, this.defaultTag);
        if (
          !this.title ||
          !this.defaultCategory ||
          this.defaultTag.length === 0 ||
          !markdown ||
          !content
        ) {
          this.$message({
            type: "error",
            message: "必填项不能为空！"
          });
          return false;
        }
        const user = this.getUser();
        const res = await this.$axios.post(ARTICLE_ADD, {
          author: user.id,
          title: this.title,
          content,
          category: this.defaultCategory,
          markdown,
          tags: this.defaultTag,
          wrapper: "",
          published: this.isPublish
        });
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "添加文章成功！！"
          });
          this.handbook = "";
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    // 初始化数据
    async initData() {
      await this.getCategories();
      await this.getTags();
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
  .edit-article-area {
    margin-top: 20px;
    min-height: 450px;
    .mavon-edit {
      height: 450px;
    }
  }
  .label-text {
    color: #aaa;
  }
  .operator {
    margin-top: 10px;
  }
  .title-box {
    display: flex;
    margin-bottom: 10px;
  }
  .title-input {
    flex: 1;
    margin-left: 6px;
  }
  .title-label {
    display: block;
    color: #aaa;
    line-height: 200%;
  }
}
</style>
