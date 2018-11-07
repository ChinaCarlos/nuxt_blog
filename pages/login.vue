<template>
  <div class="container">
    <div class="loginContainer">
      <div class="companyInfo"></div>
      <div class="loginBox">
        <h4 class="title">导购商城管理平台</h4>
        <el-form ref="form" label-width="80px" class="loginForm">
          <el-form-item label="用户名">
            <el-input placeholder="用户名/邮箱" v-model="userName"></el-input>
          </el-form-item>
          <el-form-item label="密　码">
            <el-input placeholder="用户密码" type="password" v-model="userPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="success">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: 'admin',
      userPassword: 'admin',
      captchaUrl: ''
    }
  },
  mounted() {},
  methods: {
    checkout() {},
    async login() {
      let res = await this.$axios.post(`/sys/login?username=${this.userName}&password=${this.userPassword}`)
      if (res.data.code === 0) {
        // 保存用户信息到store中
        this.$message({
          message: '登录成功！',
          type: 'success',
          duration: '1000',
          onClose: () => {
            this.$router.push({
              path: '/'
            })
          }
        });
      } else {
        this.$message({
          message: res.data.msg,
          duration: '3000',
          type: 'error'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(~assets/images/login_bg1.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .loginContainer {
    width: 850px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid #fff;
    border-top: 2px solid #fff;

    .loginBox {
      width: 360px;
      height: 260px;
      background: rgba(255, 255, 255, 0.2);
      position: absolute;
      right: 0;
      top: 20px;

      .title {
        width: 100%;
        color: #fff;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        box-sizing: border-box;
        border-bottom: 2px solid #fff;
      }

      .loginForm {
        padding: 40px 20px 20px 20px;
      }
    }
  }
}
</style>
