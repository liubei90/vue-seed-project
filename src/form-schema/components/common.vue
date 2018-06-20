<template>
  <div>
    <template v-if="tagName">
      <component :is="tagName" v-bind="attrs"></component>
    </template>
    <div v-else>
      请设置组件类型
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tagName: {
      type: String,
      default: ''
    },
    attrs: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {};
  }
};
</script>
