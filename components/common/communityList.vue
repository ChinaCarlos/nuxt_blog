<template>
  <el-row class="communityList">

    <el-col :span="24">
      <h3 class="title"><i class="fa fa-linux"></i> 友情社区</h3>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'communityList'
}
</script>

<style lang="scss" scoped>
.communityList {
  background: #fff;
  margin-top: 10px;
  height: 360px;
  border-radius: 6px;
  padding: 20px;

  .title {
    font-size: 16px;
    color: #333;
    line-height: 28px;
  }
}
</style>
