<script>
export default {
  data () {
    return {};
  },
  render (h) {
    return h('div', {
      ref: 'div'
    }, [
      h('button', {
        ref: 'btn',
        on: {
          click: () => {
            console.log(this.$refs.div);
            console.log(this.$refs.btn);
          }
        }
      }, ['hiBtn']),
      h('input', {
        ref: 'input',
        on: {
          'on-focus': () => {
            console.log(this.$refs.input);
          }
        }
      })
    ]);
  }
};
</script>
