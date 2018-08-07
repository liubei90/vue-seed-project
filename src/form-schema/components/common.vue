<template>
  <div>
    <template v-if="tagName">
      <component :is="tagName" v-bind="arrtsMap"></component>
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
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {};
  },
  computed: {
    arrtsMap () {
      return this.attrs.reduce((map, item) => {
        map[item.name] = item.value;
        return map;
      }, {});
    }
  }
};
</script>
