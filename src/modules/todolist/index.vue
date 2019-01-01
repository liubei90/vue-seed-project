<!-- <template>
  <div>
    <todo-list :todo-list="todoList">
      <template slot-scope="item">
        <div>
          {{item.todo.name + 'template'}}
        </div>
      </template>
    </todo-list>
  </div>
</template> -->

<script>
  import todoList from './todo-list.vue';

  export default {
    components: {
      todoList
    },
    data () {
      return {
        todoList: [
          {
            name: 'hahha1'
          },
          {
            name: 'hello, world'
          },
          {
            name: 'who a u'
          }
        ]
      };
    },
    render (h) {
      return h('todo-list', {
        props: {
          todoList: this.todoList
        }
        // scopedSlots: {
        //   default: (props) => {
        //     return h('div', props.todo.name + 'template');
        //   }
        // }
      });
    }
  };
</script>