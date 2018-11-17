<template>
  <el-container class="signUpConainer">
    <el-row class="box">
      <el-card class="box-card">
        <div slot="header">
          <span class="title"><i class="fa fa-pagelines"></i>  用户注册</span>
        </div>
        <el-form :model="signUpForm" ref="signUpForm" :rules="rules" label-width="80px" status-icon>
          <el-form-item prop="name" label="昵称" inline-message>
            <el-input v-model="signUpForm.name" type="text">
            </el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="signUpForm.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input v-model="signUpForm.code" type="text">
              <span slot="suffix" class="primary-text" v-if="!isSend" @click="sendCode">发送验证码</span>
              <span slot="suffix" class="gary-text" v-else>重新发送{{seconds}} s</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="signUpForm.password" type="password">
            </el-input>
          </el-form-item>
          <el-form-item prop="rePassword" label="重复密码">
            <el-input v-model="signUpForm.rePassword" type="password">
              <!-- <i slot="suffix" class="el-input__icon el-icon-view"></i> -->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="login">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </el-container>
</template>

<script>
import test from '../components/test'
import {
  isEmail
} from '../utils/validate_util'

export default {
  data() {
    return {
      signUpForm: {
        name: '',
        password: '',
        email: '',
        code: '',
        rePassword: '',

      },
      rules: {
        name: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 10,
            message: '长度在4-10个字符之间',
            trigger: 'blur'
          }
        ],
        email: [{
          required: true,
          message: '邮箱不能为空！',
          trigger: 'blur'
        }, {
          validator: this.checkEmail,
          trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '密码不能为空！',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 14,
            message: '密码长度请在6-14位!',
            trigger: 'blur'
          }
        ],
        rePassword: [{
            required: true,
            message: '不能为空！',
            trigger: 'blur'
          },
          {
            validator: this.checkRePassword,
            trigger: 'blur'
          }
        ],
        code: [{
            required: true,
            message: '验证码不能为空！',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 6,
            message: '验证码长度为4-6位',
            trigger: 'blur'
          }
        ]
      },
      isSend: false,
      seconds: 60
    }
  },
  methods: {
    // 用户注册
    async login() {
      let data = {
        name: this.signUpForm.name,
        password: this.signUpForm.password,
        email: this.signUpForm.email
      }
      const res = await this.$axios.post('/api/users/signUp', data);
      if (res.data.code === 0) {
        this.$message({
          type: 'success',
          message: '注册成功！'
        })
      } else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    },
    // 发送邮箱验证码
    async sendCode() {

      const email = this.signUpForm.email;
      if (!isEmail(email)) {
        this.$message({
          type: 'error',
          message: '邮箱地址不合法！'
        })
        return false
      } else {
        this.isSend = true
        const res = await this.$axios.post('/api/users/sendCode', {
          email
        })
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: `验证码已发送到邮箱${this.signUpForm.email}中，请注意查收！`
          })
          const timer = setInterval(() => {
            this.seconds = this.seconds - 1
            if (this.seconds === 0) {
              this.isSend = false
              this.seconds = 60
              clearInterval(timer)
            }
          }, 1000)
        }
      }

    },
    // 检查邮箱是否合法
    checkEmail: (rule, value, callback) => {
      if (isEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱地址格式不正确！'))
      }
    },
    // 检查密码是否一致
    checkRePassword: function (rule, value, callback) {
      if (this.signUpForm.password === value) {
        callback()
      } else {
        callback(new Error('两次输入的密码不一致！'))
      }
    }
  },
  async mounted() {
    this.$nextTick(() => {})
  }
}
</script>

<style lang="scss" scoped>
.signUpConainer {
  width: 100%;
  height: 100%;
  /* background-image: url('~assets/images/login_bg.jpg'); */
  background-size: 100% 100%;
  position: relative;
  background: #dedddd24;
}

.box {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -250px;
  border-radius: 10px;

  .box-card {
    background: transparent;
    box-shadow: none;
    border: none;
  }

  .primary-text {
    color: #409eff;
    padding-right: 5px;
    cursor: pointer;
  }

  .gary-text {
    color: gray;
    padding-right: 5px;
  }
}

.title {
  color: red;
}
</style>
