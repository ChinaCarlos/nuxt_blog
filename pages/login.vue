<template>
  <div class="login-page">
    <input type="text" name="username" v-model="username">
    <div @click="login">确定</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
      async login() {
          let data = {username: this.username}
          const res = await this.$axios.post('/api/login',data);
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
