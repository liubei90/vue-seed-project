<template>
  <div class="operate-schema">
    <div class="operate-schema_panel">
      <div class="left-panel">
        <!-- 工具箱 -->
        <tools-panel></tools-panel>
      </div>
      <div class="right-panel">
        <!-- 属性面板 -->
        <property-panel :component-list="componentList"></property-panel>
      </div>
      <div class="center-panel">
        <!-- 预览区域 -->
        <preview-panel :component-list="componentList"></preview-panel>
      </div>
    </div>
  </div>
</template>

<script>
import toolsPanel from './fragment/tools-panel.vue';
import propertyPanel from './fragment/property-panel.vue';
import previewPanel from './fragment/preview-panel.vue';
export default {
  components: {
    toolsPanel,
    propertyPanel,
    previewPanel
  },
  data () {
    return {
      componentList: []
    };
  }
};
</script>

<style lang="less">
  .operate-schema {
    .operate-schema_panel {
      .left-panel {
        float: left;
        width: 300px;
      }
      .right-panel {
        float: right;
        width: 300px;
      }
      .center-panel {
        margin: 0 300px;
      }
    }
  }
</style>