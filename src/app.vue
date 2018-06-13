<template>
  <div>
      234{{title}}
      <transition>
        <keep-alive :exclude="/NotAlive$/">
            <router-view />
        </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
  provide: function () {
    return {
      obj: this.obj
    }
  },
  data () {
    return {
      title: 'hello, world',
      obj: {
        name: 'hi, u'
      }
    }
  },
  created () {
    setTimeout(() => {
      console.log('timeout')
      this.obj.name = Math.random()
    }, 3000)
  }
}
</script>