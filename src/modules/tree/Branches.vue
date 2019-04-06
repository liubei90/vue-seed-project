<template>
  <div v-if="branchesData">
    <Leaf :msg="branchesData.msg" @click.stop.native="handleClick()">{{ activated }}/{{ expand }}</Leaf>
    <el-collapse-transition>
      <div v-if="branchesData.subs && expand" class="branches-leaf">
        <Branches 
          v-for="item in branchesData.subs"
          :key="item[keyName]"
          :branchesData="item"
          :depth="depth + 1"
          :activatedData="activatedData"
          :keyName="keyName"
          :state="getSubState(item)"
          @change="emitChange"></Branches>
      </div>
    </el-collapse-transition>
    <!-- <transition name="expand">
      <div v-if="branchesData.subs && expand" class="branches-leaf">
        <Branches 
          v-for="item in branchesData.subs"
          :key="item[keyName]"
          :branchesData="item"
          :depth="depth + 1"
          :activatedData="activatedData"
          :keyName="keyName"
          :state="getSubState(item)"
          @change="emitChange"></Branches>
      </div>
    </transition> -->
  </div>
</template>

<script>
import Leaf from './Leaf';
export default {
  name: 'Branches',
  components: {
    Leaf,
  },
  props: {
    depth: {
      type: Number,
      default: 1,
    },
    activatedData: {
      type: Object,
      default: null,
    },
    branchesData: {
      type: Object,
      default: null,
    },
    state: {
      type: Object,
      default: () => ({}),
    },
    keyName: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    activated() {
      return this.activatedData === this.branchesData;
    },
    expand() {
      return this.state.expand;
    }
  },
  methods: {
    getSubState(item) {
      return this.state.subStates && this.state.subStates[item[this.keyName]] || {};
    },
    handleClick(v) {
      this.$emit('change', v || this.branchesData);
    },
    emitChange(v) {
      this.handleClick(v)
    }
  },
};
</script>

<style>
.expand-enter,
.expand-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
.expand-enter-active,
.expand-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 2000ms cubic-bezier(0.23, 1, 0.32, 1), opacity 2000ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}
.branches-leaf {
  overflow: hidden;
}
</style>