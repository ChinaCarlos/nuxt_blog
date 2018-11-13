<template>
  <div class="container">
    index page
  </div>
</template>

<script>
export default {
  async mounted() {
    const res = this.$axios.get('/api/city/list')
    console.log(res)
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url(~assets/images/index_bg.png);
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
