<template>
  <div>
    {{ msg }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      
    };
  },
};
</script>