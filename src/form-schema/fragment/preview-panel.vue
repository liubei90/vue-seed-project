<template>
  <div>
    <drag-group 
      group-tag="tools" 
      :drag-list="componentList" 
      @drag="dragTool">
      <component 
        slot-scope="drag" 
        :is="getComponent(drag.item)" 
        v-bind="drag.item"></component>
      <!-- <div slot-scope="drag">
        {{ drag.item.label + drag.item.name }}
      </div> -->
    </drag-group>
  </div>
</template>

<script>
import dragGroup from './drag-group.vue';
import common from '../components/common.vue';
import row from '../components/row.vue';
import col from '../components/col.vue';
import formItem from '../components/form-item.vue';

const componentMap = {
  'common': common,
  'row': row,
  'col': col,
  'form-item': formItem
};

export default {
  props: {
    componentList: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  components: {
    dragGroup,
    common,
    row,
    col,
    formItem
  },
  data () {
    return {};
  },
  methods: {
    getComponent (item) {
      console.log(JSON.stringify(item));
      const { name } = item;

      console.log(componentMap[name]);

      return componentMap[name] || 'div';
    },
    dragstart (data) {
      ;
    },
    dragover (data) {
      ;
    },
    drop (data) {
      this.componentList.push(data);
    },
    dragTool ({ type, data }) {
      switch (type) {
        case 'dragstart':
          this.dragstart(data);
          break;
        case 'dragover':
          this.dragover(data);
          break;
        case 'drop':
          this.drop(data);
          break;
      }
    }
  }
};
</script>