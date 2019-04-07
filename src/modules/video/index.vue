<template>
  <div>
    <video @click="handleClick" class="video-element" :src="videoSrc"></video>
  </div>
</template>

<script>
import ViewVideo from './ViewVideo';
import { openView } from '@libs/view';
export default {
  data() {
    return {
      videoSrc: 'http://localhost:8000/baise.mp4',
    };
  },
  methods: {
    handleClick() {
      openView(ViewVideo, { videoSrc: this.videoSrc });
    },
  },
};
</script>

<style>
.video-element {
  width: 100%;
}
</style>