<template>
    <el-row class="recommendList">
       <el-col :span="24">
           <h3 class="title"><i class="fa fa-fire"></i> 文章推荐</h3>
       </el-col>
    </el-row>
</template>
<script>
export default {
    name: 'recommendList'
}
</script>
<style lang="scss" scoped>
.recommendList {
  background: #fff;
  margin-top: 10px;
  border-radius: 6px;
  height: 500px;
  padding: 20px;
  .title {
    font-size: 16px;
    color: #333;
    line-height: 28px;
    .fa-fire {
      color: rgb(192, 3, 3);
    }
  }
}
</style>
