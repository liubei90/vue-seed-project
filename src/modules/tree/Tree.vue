<template>
  <div v-if="branchesList">
    <Branches 
      v-for="item in branchesList"
      :key="item[keyName]"
      :branchesData="item"
      :activatedData="activatedItem"
      :keyName="keyName"
      :state="stateData[item[keyName]]"
      @change="handleChange"></Branches>
  </div>
</template>

<script>
import Branches from './Branches';
export default {
  components: {
    Branches,
  },
  props: {
    branchesList: {
      type: Array,
      default: null
    },
    keyName: {
      type: String,
      default: 'msg',
    },
  },
  data() {
    return {
      activatedItem: null,
      stateData: {},
      pathForStateData: {},
    };
  },
  created() {
    this.resetState();
  },
  watch: {
    branchesList() {
      this.resetState();
    },
    activatedItem() {
      this.resetExpand();
    }
  },
  methods: {
    keyIteratee(item) {
      return item[this.keyName]
    },
    fullKeyIteratee(key, prefix) {
      if (typeof key === 'object' && key !== null) {
        key = this.keyIteratee(key);
      }
      return prefix + '_' + key;
    },
    resetPathState(state, prefix = '') {
      let result = {};
      const keys = Object.keys(state);
      if (keys.length) {
        keys.forEach(key => {
          const subPrefix = this.fullKeyIteratee(key, prefix);
          result[subPrefix] = state[key];
          if (state[key].subStates) {
            const sub = this.resetPathState(state[key].subStates, subPrefix);
            Object.assign(result, sub);
          }
        });
      }
      return result;
    },
    resetState() {
      this.stateData = this.foreachBranches(this.branchesList);
      this.pathForStateData = this.resetPathState(this.stateData);
    },
    foreachBranches(branchesList) {
      const tmp = {};
      branchesList.forEach((item) => {
        const key = this.keyIteratee(item);
        if (item.subs) {
          const subStates = this.foreachBranches(item.subs);
          tmp[key] = {
            item,
            subStates,
            expand: false,
          }
        } else {
          tmp[key] = {
            item,
            expand: false,
          }
        }
      });
      return tmp;
    },
    forEachAllBranches(list, cb, prefix = '') {
      const results = [];
      list.forEach((item) => {
        const fullKey = this.fullKeyIteratee(item, prefix);
        let subResults = [];
        if (item.subs) {
          subResults = this.forEachAllBranches(item.subs, cb, fullKey);
        }
        results.push(cb(item, subResults, fullKey));
      });
      return results;
    },
    resetExpand() {
      this.forEachAllBranches(this.branchesList, (item, subResults, fullKey) => {
        if (subResults.indexOf(true) > -1 && this.pathForStateData[fullKey]) {
          return this.pathForStateData[fullKey].expand = true;
        }
        if (this.activatedItem === item && this.pathForStateData[fullKey]) {
          return this.pathForStateData[fullKey].expand = true;
        }
        return this.pathForStateData[fullKey].expand = false;
      });
    },
    handleChange(v) {
      this.activatedItem = v;
    },
  },
};
</script>