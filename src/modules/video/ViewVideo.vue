<template>
  <div class="view-video">
    <video controls autoplay :src="videoSrc"></video>
  </div>
</template>

<script>
export default {
  props: {
    videoSrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.view-video {
  
}
.view-video video {
  max-width: 100%;
}
</style>