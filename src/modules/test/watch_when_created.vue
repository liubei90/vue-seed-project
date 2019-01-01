/** 
* created函数中修改状态，会触发watch响应
* watch只有响应函数时，只会在依赖状态被修改时被调用
*/
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
      console.log('watch count');
      this.countList.push(this.count);
    }
  },
  created() {
    this.count++;
    console.log('created');
  }
}
</script>
