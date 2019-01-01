<template>
  <div>

  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.$route.params.id);
    // console.log(this.id);
  },
  activated() {
    console.log(this.$route.params.id);
    console.log(this.id);
  }
}
</script>
