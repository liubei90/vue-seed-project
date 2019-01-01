<template>
  <div>
    user: {{id}}
    <div>
      <router-link to="/test">test</router-link>
      <router-link to="/user/1">user1</router-link>
      <router-link to="/user/2">user2</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {}
    },
    created () {
      console.log('created')
    },
    beforeRouteEnter (from, to, next) {
      console.log('beforeRouteEnter')
      next()
    },
    beforeRouteUpdate (from, to, next) {
      console.log('beforeRouteUpdate')
      next()
    },
    beforeRouteLeave (from, to, next) {
      console.log('beforeRouteLeave')
      next()
    }
  }
</script>