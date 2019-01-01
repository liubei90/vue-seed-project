<template>
  <div>
    {{ count }}
    <hr>
    <ol>
      <li 
        v-for="(his, index) in history" 
        :key="his.tag + index">{{ his }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      history: []
    };
  },
  computed: {
    calcCount () {
      ;
    }
  },
  watch: {
    count () {
      this.history.push({ tag: 'watch', count: this.count });
    }
  },
  created () {
    this.count++;
    this.history.push({ tag: 'created, syncChange', count: this.count });
    setTimeout(() => {
      this.count++;
      this.history.push({ tag: 'created, setTimeout', count: this.count });
    }, 2000);
  }
};
</script>
