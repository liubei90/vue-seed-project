<template>
  <div>
    {{ todo.name }}
  </div>
</template>

<script>
  export default {
    props: {
      todo: {
        type: Object,
        defualt () {
          return {};
        }
      }
    },
    data () {
      return {};
    },
    created () {}
  };
</script>