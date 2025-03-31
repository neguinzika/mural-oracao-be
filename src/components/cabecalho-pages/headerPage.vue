<script >

import {RouterLink} from "vue-router";

export default {
    components: {RouterLink},
    data() {

    }}

</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink class="paginas" to="/">Pedido Oração</RouterLink>
        <RouterLink class="paginas" to="/campanhas">Pedido Campanha</RouterLink>
        <RouterLink class="paginas" to="/oracoes">Mural de Orações </RouterLink>
        <RouterLink class="paginas" to="/muralCampanha">Mural da Campanha</RouterLink>
      </nav>
    </header>
  </div>
</template>

<style lang="css" src="./headerPage.css" scoped/>

