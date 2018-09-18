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
  activated() {
    console.log(this.id);
  }
}
</script>
