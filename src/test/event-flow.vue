<script>
export default {
  data() {
    return {};
  },
  render(h) {
    const btn = h('button', {
      on: {
        'click': () => {
          console.log('clickHandler in render');
        }
      },
      ref: 'btn',
    }, ['btn']);

    return h('div', {}, [btn]);
  },
  mounted() {
    const btn = this.$refs['btn'];
    console.log(btn);

    if (btn) {
      btn.addEventListener('click', () => {
        console.log('clickHandler in caption');
      }, true);

      btn.addEventListener('click', () => {
        console.log('clickHandler in bubble');
      }, false);
    }
  }
}
</script>
