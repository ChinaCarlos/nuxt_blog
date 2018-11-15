<template>
  <div class="login-page">
    <input type="text" name="name" v-model="name">
    <input type="password" name="password" v-model="password">
    <input type="text" name="email" v-model="email">
    <div @click="login">确定</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      email: ''
    }
  },
  methods: {
      async login() {
          let data = {name: this.name,password: this.password,email: this.email}
          const res = await this.$axios.post('/api/user/register',data);
          if(res.data.code === 0){
              sessionStorage.setItem('token',res.data.token)
          }
      }
  },
  async mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.login-page {
}
</style>
