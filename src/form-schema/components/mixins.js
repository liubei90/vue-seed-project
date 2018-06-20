export const componentInitMetaMixin = {
  props: {
    meta: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  watch: {
    meta () {
      this.initMeta();
    }
  },
  created () {
    this.initMeta();
  },
  methods: {
    initMeta () {
      if (this.metaProps && this.meta) {
        const keys = Object.keys(this.metaProps);

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = this.metaProps[key];

          if (!Object.prototype.hasOwnProperty.call(this.meta, key)) {
            this.$set(this.meta, key, typeof value === 'function' ? value.call(this) : value);
          }
        }
      }
    }
  }
};
