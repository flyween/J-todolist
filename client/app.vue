<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <todo></todo> -->
    <router-link to="/app">Todo</router-link>
    <router-link to="/login">Login</router-link>
    <transition>
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer,
    Todo,
  },
  mounted () {
    console.log(this.$store)
  }
}
</script>

<style scoped>
#app{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#cover{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: .9;
  z-index: -1;
}
</style>


