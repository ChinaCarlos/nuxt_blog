<template>
  <div class="asidePage">
    <h3>营销导购</h3>
    <el-menu class="aslideMenu">
      <!-- :collapse="true" -->
      <el-submenu v-for="(menuItem, indexs) in menuList" :key=menuItem.name :index="indexs.toString()">
        <template slot="title">
          <i :class="menuItem.icon"></i>
          <span>{{menuItem.name}}</span>
        </template>
        <el-menu-item-group>
          <!-- <el-menu-item v-for="(item, index) in menuItem.list" :key="item.name" :index="indexs+'-'+index"><nuxt-link :to="item.url" class="links"><i :class="item.icon"></i>&nbsp;{{item.name}}</nuxt-link></el-menu-item> -->
          <el-menu-item v-for="(item, index) in menuItem.list" :key="item.name" :index="indexs+'-'+index"><i :class="item.icon"></i>&nbsp;{{item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'appAside',
  data() {
    return {
      menuList: []
    }
  },
  async mounted() {
    await this.getMenuLists()
  },
  methods: {
    getMenuLists: async function() {
      let res = await this.$axios.get('/sys/menu/user')
      if (res.data.code === 0) {
        this.menuList = res.data.menuList
      } else {
        // 中间件auth鉴权先处理
        this.$message({
          message: '侧边栏渲染失败！',
          duration: '3000',
          type: 'error'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.asidePage {
  width: 200px;
  height: 100%;
  overflow: hidden;

  h3 {
    width: 200px;
    font-size: 18px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: #fff;
  }

  .aslideMenu {
    width: 100%;
    height: 100%;
  }

  .links {
    text-decoration: none;
    color: #333;
  }
}
</style>
