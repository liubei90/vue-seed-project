<!-- <template>
  <div>
    <template v-for="todo in todoList">
      <slot v-bind:todo="todo">
        <todo-item :todo="todo"></todo-item>
      </slot>
    </template>
  </div>
</template> -->

<script>
import todoItem from './todo-item.vue';

export default {
  props: {
    todoList: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  components: {
    todoItem
  },
  data () {
    return {
    };
  },
  render (h) {
    const children = this.todoList.map(todo => {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default({
          todo
        });
      } else {
        return h('todo-item', {
          props: {
            todo
          }
        });
      }
    });

    return h('div', children);
  }
};
</script>