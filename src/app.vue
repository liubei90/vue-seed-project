<template>
  <div>
    234{{title}}
    <div>
      <router-link to="/test">test</router-link>
      <router-link to="/user/1">user1</router-link>
      <router-link to="/user/2">user2</router-link>
    </div>
    <transition>
      <keep-alive :exclude="/NotAlive$/">
          <router-view />
      </keep-alive>
    </transition>

    <div>
      <todo-list></todo-list>
    </div>
  </div>
</template>

<script>
import todoList from './todo-list.vue';

export default {
  provide: function() {
    return {
      obj: this.obj,
    }
  },
  components: {
    todoList,
  },
  data() {
    return {
      title: 'hello, world',
      obj: {
        name: 'hi, u'
      }
    }
  },
  created() {
    setTimeout(() => {
      console.log('timeout');
      this.obj.name = Math.random();
    }, 3000);
  },
}
</script>