<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <br />
    <Router-Link to="/">Inicio</Router-Link>
    <span> | </span>
    <Router-Link to="/login">Login</Router-Link>
    <span> | </span>
    <Router-Link to="/signup">Registrarse</Router-Link>
    <span> | </span>
    <Router-Link to="/dashboard">Dashboard</Router-Link>
    <br /><br />
    <Router-view></Router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
