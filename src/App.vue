<template>
  <div id="app">
    <HelloWorld msg="Handlingslista"/>
    <ToDo/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ToDo from './components/ToDo.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ToDo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
