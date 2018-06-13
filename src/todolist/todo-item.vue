<template>
  <div v-if="title">
    234
    <input v-model="title.name">
    {{obj.name}}

  </div>
</template>

<script>
  export default {
    inject: {
      obj: 'obj'
    },
    props: {
      title: {
        type: Object,
        defualt: null
      }
    },
    data () {
      return {}
    },
    watch: {
      'title.name': function (v, old) {
        console.log('in todo item', old, v)
        this.$emit('change')
      },
      'obj.name': function () {
        console.log('watch parentTitle', this.obj.name)
      }
    },
    created () {
      console.log('created parentTitle', this.obj.name)
    }
  }
</script>