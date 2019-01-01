<template>
  <div>
    <el-button @click="openDialog">打开弹窗</el-button>

    <el-dialog :visible.sync="dialogVisible" width="80%">
      <div>
        <el-form>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="收款人">
                <el-select v-model="collector" remote filterable :remote-method="searchCollector">
                  <el-option 
                    v-for="item in collectorList" 
                    :key="item"
                    :value="item" 
                    :label="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collectorList: [],
      collector: '',
      dialogVisible: false
    };
  },
  methods: {
    openDialog () {
      this.dialogVisible = true;
    },
    searchCollector (keyword) {
      this.collectorList = [];
      setTimeout(() => {
        this.collectorList = [1, 2, 3, 4, 5, 6, 7, 8, 10];
      }, 1000);
    }
  }
};
</script>
