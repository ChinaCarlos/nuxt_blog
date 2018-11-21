<template>
  <div class="indexContainer">
    <Pano title="菱歌科技" width="100%" height="100%" bundle="/images/pantry/" format="jpg"></Pano>
  </div>
</template>
<script>
export default {
  name: 'indexpage',
  data() {
    return {
      userInfo:{}
    }
  },
  comupted(){},
  methods:{},
}
</script>

<style lang="scss" scoped>
.indexContainer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

