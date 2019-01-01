<template>
  <div>
    <div>
      <button @click="show('markline')">markline</button>
    </div>
    <div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import markline from './components/markline';

export default {
  data() {
    return {
      currentTab: 'markline',
    }
  },
  computed: {
    currentComponent() {
      if (this.currentTab === 'markline') {
        return markline;
      }
      return 'div';
    }
  },
  methods: {
    show(tab) {
      this.currentTab = tab;
    }
  }
}
</script>