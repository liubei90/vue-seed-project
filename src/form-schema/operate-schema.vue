<template>
  <div class="operate-schema">
    <div class="operate-schema_panel">
      <div class="left-panel">
        <!-- 工具箱 -->
        <tools-panel></tools-panel>
      </div>
      <div class="right-panel">
        <!-- 属性面板 -->
        <property-panel 
          :component-list="componentList" 
          :component-property-map="componentPropertyMap" 
          :component="component"></property-panel>
      </div>
      <div class="center-panel">
        <!-- 预览区域 -->
        <preview-panel 
          :component-list="componentList" 
          :component-property-map="componentPropertyMap"
          @change="changeComponent"></preview-panel>
      </div>
    </div>
  </div>
</template>

<script>
import Ajv from 'Ajv';
import draft06 from '@@/json-schema-draft-06.json';
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
      componentList: [],
      componentPropertyMap: {},
      component: null
    };
  },
  created () {
    console.log(Ajv);
    // console.log(draft06);

    var ajv = new Ajv();

    var validate = ajv.addMetaSchema(draft06).compile({
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['jone']
        }
      }
    });

    console.log(validate({
      type: 'jone'
    }));

    console.log(validate({
      type: 'jone1'
    }));

  },
  methods: {
    initComponentProperty () {
      if (!this.component) return;

      const componentId = this.component.componentId;

      if (!this.componentPropertyMap[componentId]) {
        this.$set(this.componentPropertyMap, componentId, {});
      }
    },
    changeComponent ({ type, component }) {
      switch (type) {
        case 'change_component':
          this.component = component;
          this.initComponentProperty();
          break;
      }
    }
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