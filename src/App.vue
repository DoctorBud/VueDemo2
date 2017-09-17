<template>
  <div id="app">
    <img style="height:50px;" src="./assets/logo.png">
    <router-link :to="{ name: 'Hello' }">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/search">Search</router-link>
    <router-link to="/coins/ethereum">Ethereum</router-link>
    <router-link to="/coins/bitcoin">Bitcoin</router-link>
    <router-link to="/watch">Watch</router-link>
    <router-link to="/todos">To Dos</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px;
}
</style>
