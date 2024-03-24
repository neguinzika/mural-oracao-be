<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>
<template>
  <header>

    <nav>
      <RouterLink to="/">Pedidos</RouterLink>
      <RouterLink to="/about">Orações</RouterLink>
    </nav>

  </header>

  <RouterView/>
</template>

<style scoped>

header {
  
  display: flex;
  width: 100vw;
  justify-content: center;

}

nav {
  margin-right: 13px;
  z-index: 6;
  line-height: 0.9;
  font-size: 13px;
  text-align: right;
  padding: 4px 10px;
}

nav a.router-link-exact-active {
  color: #de6a0c;
  background-color: antiquewhite;
}

nav a.router-link-exact-active:hover {
  background-color: white;
}

nav a {
  background-color: cadetblue;
  display: inline-block;
  padding: 5px;
}


</style>
