<template>
  <div>
    <div>
      <router-link to="/router/params/2">params</router-link>
      <el-button @click="navToParams">params</el-button>
    </div>
    <div>
      <router-link to="/router/props?id=3">props</router-link>
      <el-button @click="navToProps">props</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    navToParams() {
      this.$router.push({
        name: 'router-params',
        params: {
          id: 1
        }
      });
    },
    navToProps() {
      this.$router.push({
        name: 'router-props',
        query: {
          id: 4
        }
      });
    }
  }
}
</script>
