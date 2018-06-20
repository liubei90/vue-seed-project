<template>
  <div v-html="rawHtml"></div>
</template>

<script>
export default {
  props: {
    rawHtml: {
      type: String,
      default: '<div>请设置html文本内容</div>'
    }
  },
  data () {
    return {};
  }
};
</script>
