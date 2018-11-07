<template>
  <div class="header">
    <div class="userInfoBox">
      <img class="avatar" src="~/assets/images/login_bg.jpg">
      <span class="username">{{userInfo.username}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
  data() {
    return {
      userInfo: {}
    };
  },
  async mounted() {
    await this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let userInfo = await this.$axios.get('/sys/user/info')
      if (userInfo.data.code === 0) {
        console.log(userInfo.data.user)
        this.userInfo = userInfo.data.user
        // 保存用户信息到store中
      } else {
        this.$message({
          message: '获取登录用户信息失败!',
          duration: '3000',
          type: 'error'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding-right: 30px;

  .userInfoBox {
    float: right;
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .username {
    display: block;
    line-height: 60px;
    padding-left: 15px;
    color: #409eff;
  }

  img.avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: block;
    border: 2px solid #aaa;
  }
}
</style>
