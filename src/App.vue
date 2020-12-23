<template>
  <div id="app">
    <!-- Navigation bar -->

    <router-view />
  </div>
</template>

// Load the bulma styles in the top level component
<style lang="sass" src="bulma" />

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
