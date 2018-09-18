<template>
  <div>
    <button @click="count++">count+1</button>
    <span>{{count}}</span>
    <ul>
      <li v-for="(item, index) in countList" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      countList: []
    }
  },
  watch: {
    count() {
      this.countList.push(this.count);
    }
  },
  created() {
    this.count++;
  }
}
</script>
