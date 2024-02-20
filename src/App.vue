<script setup>
import {RouterLink, RouterView} from 'vue-router'

</script>
<template>
  <header>

    <nav>
      <RouterLink to="/">Principal</RouterLink>
      <RouterLink to="/about">Orações</RouterLink>
    </nav>

  </header>

  <RouterView/>
</template>

<style scoped>

header {
  line-height: 0.9;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: right;
  margin-top: 10px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;

}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1200px) {
  header {
    display: flex;
    place-items: center;

  }

  nav {
    text-align: left;
    margin-left: 2rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
