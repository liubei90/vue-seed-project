<template>
  <div>
    <el-tabs v-model="tabName">
      <el-tab-pane label="组件属性" name="tool">
        <component :is="toolPropertyPanel"></component>
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="form">
        hahha
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import commonProperty from '../components/common-property.vue';

export default {
  props: {
    componentList: {
      type: Array,
      default () {
        return [];
      }
    },
    tool: {
      type: String,
      default: 'common'
    }
  },
  components: {
    commonProperty
  },
  data () {
    return {
      tabName: 'tool'
    };
  },
  computed: {
    toolPropertyPanel: function () {
      return commonProperty;
    }
  }
};
</script>