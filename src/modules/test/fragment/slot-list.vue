<!-- <template>
  <div>
    <slot-item 
      v-for="item in todoList" 
      :key="item.name" 
      :todo="item">
      </slot-item>
  </div>
</template> -->

<script>
import slotItem from './slot-item';

export default {
  props: {
    todoList: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data () {
    return {};
  },
  render(h) {
    console.log(this.$slots);
    console.log(this.$scopedSlots);
    
    let children = [];
    
    return h();
  }
}
</script>
