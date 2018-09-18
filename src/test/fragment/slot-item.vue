<template>
  <div>
    <div>slit-item</div>
    <slot :todo="todo"></slot>
    <slot name="cont" :todo="todo"></slot>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data () {
    return {};
  }
}
</script>
