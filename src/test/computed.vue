<template>
  <div>
    123123
    <input type="text" v-model="comCount.count">
    {{ count }}/{{ comCount }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    };
  },
  computed: {
    comCount () {
      console.log('comCount computed');
      return {
        count: this.count
      };
    }
  },
  created () {
    setTimeout(() => {
      console.log(this.comCount);
    }, 3000);
  }
};
</script>
