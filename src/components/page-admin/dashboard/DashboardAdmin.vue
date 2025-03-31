<script setup>
import editPedidos from "@/components/page-admin/editar-pedidos/editPedidos.vue";
import verMuralAdmin from "@/components/page-admin/ver-mural-admin/verMuralAdmin.vue"
import {shallowRef} from 'vue';
import editCampanhas from "@/components/page-admin/editar-campanhas/editCampanhas.vue";
import verMuralCampanha from "@/components/page-admin/ver-mural-campanha/verMuralCampanha.vue";

let componenteAtual = shallowRef(editPedidos);
let mudarComponente = (componente) => {
  componenteAtual.value = componente;
};

</script>

<template>

  <div class="main" >
    <div class="sidebar">
      <button @click="mudarComponente(editPedidos)" :class="{ selected: componenteAtual === editPedidos }">Editar Pedidos de Orações</button>
      <button @click="mudarComponente(verMuralAdmin)" :class="{ selected: componenteAtual === verMuralAdmin }">Mural de Orações</button>
      <button @click="mudarComponente(editCampanhas)" :class="{ selected: componenteAtual === editCampanhas }">Editar Campanha de Oração</button>
      <button @click="mudarComponente(verMuralCampanha)" :class="{ selected: componenteAtual === verMuralCampanha }">Mural da Campanha</button>
    </div>
    <div class="content-right">
      <component :is="componenteAtual"/>

    </div>
  </div>


</template>

<style scoped lang="css" src='./DashboardAdmin.css'/>

