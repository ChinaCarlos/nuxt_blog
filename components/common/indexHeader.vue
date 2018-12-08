<template>
  <el-menu
    default-active="1"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    class="header-menu-list"
    active-text-color="#ffd04b"
  >
    <div class="index-header-logo">
      <el-menu-item index="1">
        <img class="logo-image" src="~/assets/images/logo.png" alt="logo">
        <span class="logo-name">明若清渊</span>
        <!-- <input type="text" class="search-input"> -->
      </el-menu-item>
    </div>
    <div class="index-header-right hidden-sm-and-down">
      <el-menu-item index="2">
        <nuxt-link class="link" to="/">首页</nuxt-link>
      </el-menu-item>
      <el-menu-item index="3">
        <nuxt-link class="link" to="/about">关于我们</nuxt-link>
      </el-menu-item>
      <el-menu-item index="4">
        <nuxt-link class="link" to="/apis">API接入</nuxt-link>
      </el-menu-item>
      <el-menu-item index="5" v-if="!userInfo.name">
        <nuxt-link class="link" to="/signup">注册</nuxt-link>
      </el-menu-item>
      <el-menu-item index="6" v-if="!userInfo.name">
        <nuxt-link class="link" to="/signin">登录</nuxt-link>
      </el-menu-item>
      <el-menu-item index="7" v-if="userInfo.name">
        <nuxt-link class="link" to="/admin/">
          <i class="fa fa-paint-brush"></i>&nbsp;写文章
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="8" v-if="userInfo.name">
        <nuxt-link class="link" to="/user/23">欢迎您，{{userInfo.name}}</nuxt-link>
      </el-menu-item>
    </div>
    <div class="index-header-right hidden-sm-and-up menu-list">
      <el-menu-item index="6">list</el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: "indexHeader",
  data() {
    return {
      userInfo: {}
    };
  },
  beforeMount() {},
  mounted() {
    this.userInfo =
      JSON.parse(localStorage.getItem("nuxt_user")) ||
      this.$store.state.modules.Auth.userInfo;
    console.log(this.userInfo);
  }
};
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

    .logo-image {
      width: 40px;
      height: 40px;
    }

    .logo-name {
      font-size: 18px;
    }

    .el-menu-item {
      display: inline-block;
    }
  }

  .index-header-right {
    width: auto;
    height: 100%;
    float: right;
    margin-right: 40px;

    .el-menu-item {
      display: inline-block;
    }
  }

  .link {
    text-decoration: none;
    color: #fff;
  }
  /* .search-input {
    height: 30px;
    margin-left: 20px;
    width: 190px;
    background: #727980;
    border: none;
    outline: none;
    border-radius: 20px;
    transition-duration: 1s;
    padding-left: 10px;
    padding-right: 10px;
    &:hover {
      background: #ffff;
    }
  } */
  .nuxt-link-active {
    color: #ffd04b;
  }

  .menu-list {
    margin-right: 0;
  }
  .fa-paint-brush {
    color: #fff;
  }
}
</style>
