<template>
  <div class="common-property">
    <el-form 
      label-position="left" 
      label-width="60px">
      <el-form-item label="标签">
        <el-input ></el-input>
      </el-form-item>

      <!-- attrs -->
      <div>
        <el-row 
          v-for="(attr, index) in attrs" 
          :key="attr.name + index">
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
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      attrs: []
    };
  },
  methods: {
    addAttr () {
      this.attrs.push({
        name: '',
        value: ''
      });
    },
    removeAttr (index) {
      this.attrs.splice(index, 1);
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
