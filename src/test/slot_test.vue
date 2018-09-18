<template>
  <div>
    <slot-list :todoList="todoList">
        <span slot-scope="{todo}">{{todo.status}}</span>
        <div slot="cont" slot-scope="{todo}">
          <span>{{todo.cont}}</span>
        </div>
        <span></span>
      </slot-list>
  </div>
</template>

<script>
import slotList from './fragment/slot-list';
export default {
  components: {
    slotList,
  },
  data () {
    return {
      todoList: [
        { name: 'td1', cont: '1=1=1', status: 1 },
        { name: 'td2', cont: '2222', status: 2 },
        { name: 'td3', cont: '3wer', status: 2 },
        { name: 'td4', cont: '55555', status: 3 },
        { name: 'td5', cont: 'qwer', status: 3 },
      ]
    };
  }
}
</script>
