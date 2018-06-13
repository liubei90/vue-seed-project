<template>
    <div>
        <todo-list></todo-list>
    </div>
  </template>
  
  <script>
    import todoList from './todo-list.vue'

    export default {
      components: {
        todoList
      },
      data () {
        return {
        }
      }
    }
  </script>