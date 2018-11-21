<template>
  <el-menu default-active="4" class="app-header-menu" mode="horizontal" background-color="#6f67ef" text-color="#fff" active-text-color="#fff">
    <el-popover placement="bottom" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-menu-item index="1" slot="reference"><span class="userinfo">欢迎您，{{userInfo.name}}</span><img class="avatar" :src="userInfo.avatar" alt=""></el-menu-item>
    </el-popover>
    <!-- <el-submenu index="2">
      <template slot="title">关于我们</template>
      <el-menu-item index="2-1">团队介绍</el-menu-item>
      <el-menu-item index="2-2">办公环境</el-menu-item>
    </el-submenu>

    <el-menu-item index="3">客户案列</el-menu-item> -->
    <div class="logo"><img class="companyLogo" src="~/assets/images/logo.png"><span class="companyName">XXX CMS 博客管理系统</span></div>
  </el-menu>
</template>

<script>
export default {
  name: 'appHeader',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          name: 'Admin',
          avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2246397333,2536108512&fm=27&gp=0.jpg'
        }
      }
    },
    companyInfo: {
      type: Object,
      default: () => {
        return {
          companyLogoURL: '',
          companyName: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header-menu {
  padding: 0 40px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: row-reverse;
  position: relative;
  border: none;
  .logo {
    position: absolute;
    left: 50px;
    width: auto;
    height: 60px;

    .companyLogo {
      width: 50px;
      height: 50px;
      margin: 5px;
      vertical-align: middle;
    }

    .companyName {
      color: #fff;
    }
  }

  .userinfo {
    font-size: 14px;
    font-weight: bolder;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    border: 2px solid #fff;
  }
}
</style>
