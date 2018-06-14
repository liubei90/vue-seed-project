<template>
  <div class="tools-panel">
    <drag-group 
      group-tag="tools" 
      :drag-list="componentList"
      @drag="dragTool">
      <div 
        slot-scope="drag"
        class="component-item">
        {{ drag.item.label }}
      </div>
    </drag-group>
  </div>
</template>

<script>
import dragGroup from './drag-group.vue';

export default {
  components: {
    dragGroup
  },
  data () {
    return {
      noop: () => {},
      componentList: [
        {
          name: 'common',
          label: '通用组件'
        },
        {
          name: 'row',
          label: '行组件'
        },
        {
          name: 'col',
          label: '列组件'
        },
        {
          name: 'form-item',
          label: '表单元素组件'
        }
      ]
    };
  },
  mounted () {
  },
  methods: {
    dragover (data) {
      ;
    },
    drop (data) {
      ;
    },
    dragTool ({ type, data }) {
      switch (type) {
        case 'dragstart':
          break;
        case 'dragover':
          break;
        case 'drop':
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tools-panel {
  .component-item {
    font-size: 12px;
    padding: 5px 10px;
    margin: 10px 5px 0;
    display: inline-block;
    width: 105px;
    border:1px dashed #9B9BB1;
    position: relative;
    
    &::after {
      position: absolute;
      right: 10px;
      top: 8px;
      content: "::";
      color: #9B9BB1;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
