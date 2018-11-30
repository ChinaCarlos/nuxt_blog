<template>
  <div class="about">
    <Pano title="菱歌科技" width="100%" height="100%" bundle="/images/pantry/" format="jpg"></Pano>
    <!-- <Pano source="/images/equirectangular.jpg"></Pano> -->
  </div>
</template>

<script>
export default {
  name: "about",
  layout: "default"
};
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
}
</style>
