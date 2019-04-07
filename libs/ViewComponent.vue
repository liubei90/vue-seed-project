<template>
  <div class="view-component" @click.self="handleClose">
    <component class="view-component-item" v-if="componentOptions" :is="componentOptions" v-bind="componendData"></component>
    <div v-else>这是啥？</div>
  </div>
</template>

<script>
export default {
  props: {
    componentOptions: {
      type: Object,
      default: null,
    },
    componendData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.view-component {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .5);
}
</style>