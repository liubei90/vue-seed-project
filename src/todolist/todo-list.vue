<template>
  <div>
    <todo-item :title="title" @change="changeItem"></todo-item>
  </div>
</template>

<script>
import todoItem from './todo-item.vue';

  export default {
    components: {
      todoItem,
    },
    data() {
      return {
        todoList: [],
        title: {},
      }
    },
    watch: {
      'title.name': function(v, old) {
        console.log('in todo list', old, v);
      }
    },
    created() {
      setTimeout(() => {
        this.title = {
          name: '121'
        }
      }, 1000);
      setTimeout(() => {
        this.title.name = '10002';
      }, 3000);
    },
    methods: {
      changeItem() {
        console.log('emit from item', this.title);
      }
    }
  }
</script>