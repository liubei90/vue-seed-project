<template>
  <div>
    <el-tabs v-model="tabName">
      <el-tab-pane label="组件属性" name="tool">
        <component 
          :is="toolPropertyPanel" 
          :meta="property" 
          @change="changeProperty"></component>
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="form">
        hahha
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { propertyComponentMap, propertyComponentMixin, componentToPropertyMap } from '../components/index.js';

export default {
  mixins: [ propertyComponentMixin ],
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
    },
    component: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tabName: 'tool'
    };
  },
  computed: {
    toolPropertyPanel: function () {
      if (this.component) {
        return propertyComponentMap[componentToPropertyMap[this.component.name]] || 'div';
      }

      return 'div';
    },
    property: function () {
      if (this.component) {
        const componentId = this.component.componentId;

        if (this.componentPropertyMap[componentId]) {
          return this.componentPropertyMap[componentId];
        }
      }
      return {};
    }
  },
  methods: {
    changeProperty ({ type, name, value }) {
      if (type === 'property_change') {
        if (this.property.hasOwnProperty(name)) {
          this.property[name] = value;
        } else {
          this.$set(this.property, name, value);
        }
      }
    }
  }
};
</script>