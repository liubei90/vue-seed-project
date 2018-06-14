<template>
  <div>
    <div 
      v-for="(comp, index) in componentList" 
      :key="comp.name + index">
      <component 
        :is="previewElement" 
        v-bind="comp.props"></component>
    </div>
  </div>
</template>

<script>
import common from '../components/common.vue';

export default {
  data () {
    return {
      componentList: []
    };
  },
  computed: {
    previewElement () {
      return common;
    }
  },
  methods: {
    addComponent (name, index) {
      this.componentList.splice(index, 0, {
        name,
        props: {}
      });
    }
  }
};
</script>
