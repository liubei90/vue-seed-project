<template>
  <div>
    <span>html文本：</span>
    <div>
      <el-input 
        v-model="meta.rawHtml" 
        type="textarea"></el-input>
    </div>
  </div>
</template>

<script>
import { componentInitMetaMixin } from './mixins.js';

export default {
  mixins: [ componentInitMetaMixin ],
  props: { },
  data () {
    return {
      metaProps: {
        rawHtml: '<div>请设置html文本内容</div>'
      }
    };
  },
  watch: { },
  created () { },
  methods: { }
};
</script>
