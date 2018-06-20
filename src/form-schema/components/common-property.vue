<template>
  <div class="common-property">
    <el-form 
      label-position="left" 
      label-width="60px">
      <el-form-item label="标签">
        <el-input v-model="self_tagName"></el-input>
      </el-form-item>

      <!-- attrs -->
      <div>
        <el-row 
          v-for="(attr, index) in self_attrs" 
          :key="attr.attrId">
          <el-col :span="12">
            <el-form-item label="name">
              <el-input v-model="attr.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="value">
              <el-input v-model="attr.value"></el-input>
            </el-form-item>
          </el-col>
          <div class="attr-remove">
            <i class="el-icon-error" @click="removeAttr(index)"></i>
          </div>
        </el-row>
        <el-button @click="addAttr">添加attr</el-button>
        <el-button @click="submit">确定</el-button>
      </div>
    </el-form>
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
        tagName: '',
        attrs: () => ({})
      },
      self_tagName: '',
      self_attrs: []
    };
  },
  watch: {
    meta () {
      this.resetData();
    }
  },
  created () {
    this.resetData();
  },
  methods: {
    resetData () {
      this.self_tagName = this.meta.tagName;

      const attrkeys = Object.keys(this.meta.attrs);
      const tmp = [];

      for (let i = 0; i < attrkeys.length; i++) {
        tmp.push({
          name: attrkeys[i],
          value: this.meta.attrs[attrkeys[i]],
          attrId: Math.random()
        });
      }

      this.self_attrs = tmp;
    },
    addAttr () {
      this.self_attrs.push({
        name: '',
        value: '',
        attrId: Math.random()
      });
    },
    removeAttr (index) {
      this.self_attrs.splice(index, 1);
    },
    submit () {
      this.meta.tagName = this.self_tagName;
      const tmp = {};

      for (let i = 0; i < this.self_attrs.length; i++) {
        const attr = this.self_attrs[i];

        if (attr.name && (attr.value !== undefined)) {
          tmp[attr.name] = attr.value;
        }
      }

      this.meta.attrs = tmp;
    }
  }
};
</script>

<style lang="less" scoped>
.common-property {
  .attr-remove {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    color: red;
  }
}
</style>
