<template>
  <div class="preview-panel">
    <drag-group 
      group-tag="tools" 
      :drag-list="componentList" 
      @drag="dragTool">
      <div 
        slot-scope="{ item }" 
        :class="{'component-activated': component === item, 'component-hover': hoverComponent === item}" 
        class="component-item" 
        @click="changeAvtivatedComponent(item)">
        <component 
          :is="getComponent(item)" 
          v-bind="componentPropertyMap[item.componentId]"></component>
        <div class="hover-footer"></div>
      </div>
    </drag-group>
  </div>
</template>

<script>
import dragGroup from './drag-group.vue';
import { componentMap, componentMixin } from '../components/index.js';

export default {
  mixins: [ componentMixin ],
  props: {
    componentList: {
      type: Array,
      default () {
        return [];
      }
    },
    componentPropertyMap: {
      type: Object,
      default  () {
        return {};
      }
    }
  },
  components: {
    dragGroup
  },
  data () {
    return {
      component: null,
      hoverComponent: null
    };
  },
  watch: {
    component () {
      this.$emit('change', {
        type: 'change_component',
        component: this.component
      });
    }
  },
  methods: {
    getComponent (item) {
      const { name } = item;

      return componentMap[name] || 'div';
    },
    dragStart (data) {
      ;
    },
    dragChange (from, to) {
      this.hoverComponent = to;
    },
    dragEnter () {
      ;
    },
    dragLeave () {
      this.hoverComponent = null;
    },
    drop (data) {
      if (!data) return;

      // fixme: 需要判断是否拖拽的起点是预览面板，此时只做替换位置操作。如果起点是工具盒，就进行增加操作
      // fixme: 自动生成组件实例的id,需要重新定义规则
      data.componentId = Math.random().toFixed(5);

      if (this.hoverComponent) {
        const index = this.componentList.indexOf(this.hoverComponent);

        this.componentList.splice(index + 1, 0, data);
      } else {
        this.componentList.push(data);
      }
      this.component = data;
      this.hoverComponent = null;
    },
    dragTool ({ type, data, from, to }) {
      switch (type) {
        case 'drag_start':
          this.dragStart(data);
          break;
        case 'hover_change':
          this.dragChange(from, to);
          break;
        case 'drag_enter':
          this.dragEnter();
          break;
        case 'drag_leave':
          this.dragLeave();
          break;
        case 'drop':
          this.drop(data);
          break;
      }
    },
    changeAvtivatedComponent (item) {
      this.component = item || null;
    }
  }
};
</script>

<style lang="less">
.preview-panel {
  .component-item {
    border: 1px dashed #9B9BB1;
    &.component-activated {
      border: 1px dashed red;
    }
    &.component-hover {
      .hover-footer {
        border: 1px dashed blue;
        height: 2px;
      }
    }
  }
}
</style>
