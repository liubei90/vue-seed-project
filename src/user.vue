<template>
  <div>
    user: {{id}}
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true,
      }
    },
    data() {
      return {};
    },
    created() {
      console.log('created');
    },
    beforeRouteEnter(from, to, next) {
      console.log('beforeRouteEnter');
      next();
    },
    beforeRouteUpdate(from, to, next) {
      console.log('beforeRouteUpdate');
      next();
    },
    beforeRouteLeave(from, to, next) {
      console.log('beforeRouteLeave');
      next();
    },
  }
</script>