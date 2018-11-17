<template>
  <el-container class="loginConainer">
    <el-row class="box">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="name" label="昵称">
          <el-input v-model="ruleForm.name" type="text">
          </el-input>
        </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="ruleForm.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="ruleForm.password" type="password">
              <i slot="suffix" class="el-input__icon el-icon-view"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round :loading="isLogin" @click="login">登录</el-button>
          </el-form-item>
      </el-form>
    </el-row>
  </el-container>
</template>

<script>
import test from '../components/test'
export default {
  components: {
    test
  },
  data() {
    return {
      ruleForm: {
        name: '',
        password: '',
        email: '',
      },
      rules: {
        name: [
          // {
          //   required: true,
          //   message: '请输入邮箱',
          //   trigger: 'blur'
          // },
          // {
          //   min: 10,
          //   max: 25,
          //   message: '长度在10-25个字符之间',
          //   trigger: 'blur'
          // },
          //  { validator: validatePass2, trigger: 'blur' }
        ]
      },
      isLogin: false
    }
  },
  methods: {
    async login() {
      let data = {
        name: this.ruleForm.name,
        password: this.ruleForm.password,
        email: this.ruleForm.email
      }
      const res = await this.$axios.post('/api/users/signup', data);
      if (res.data.code === 0) {
        sessionStorage.setItem('token', res.data.token)
      }
    }
  },
  async mounted() {
    this.$nextTick(() => {})
  }
}
</script>

<style lang="scss" scoped>
.loginConainer {
  width: 100%;
  height: 100%;
  /* background-image: url('~assets/images/login_bg.jpg'); */
  background-size: 100% 100%;
  position: relative;
  /* background: #dedddd24; */
}

.box {
  width: 400px;
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
}
</style>
