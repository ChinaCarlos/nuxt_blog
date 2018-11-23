<template>
  <div class="indexContainer">
    <!-- <Pano title="菱歌科技" width="100%" height="100%" bundle="/images/pantry/" format="jpg"></Pano> -->
    <!-- <Pano source="/images/equirectangular.jpg"></Pano> -->
  </div>
</template>

<script>
export default {
  name: 'indexpage',
  data() {
    return {
      userInfo: {}
    }
  },
  comupted() {},
  methods: {},
  layout: 'index'
}
</script>

<style lang="scss" scoped>
.indexContainer {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
