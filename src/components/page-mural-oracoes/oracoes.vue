<template>
  <div>
    <header>
      <nav>
        <RouterLink class="paginas" to="/">Pedidos</RouterLink>
        <RouterLink class="paginas" to="/campanhas">Campanha de Oração</RouterLink>
        <RouterLink class="paginas" to="/oracoes">Mural de Orações</RouterLink>
        <RouterLink class="paginas" to="/muralCampanha">Mural Campanha</RouterLink>
      </nav>
    </header>
  </div>
  <div class="background"></div>
  <div class="tudo">

    <div class="filter">

      <!--<button class="pause" @click="toggleAnimation"></button>-->

    </div>
    <div class="scroll">
      <div class="container">
        <div id="message-container" :class="{ 'paused': isPaused }">
          <div v-for="pedido in pedidosFiltradosOrdenados" :key="pedido.id" class="message">
            <p>{{ pedido.oracao }}</p>
          </div>
          </div>
        </div>
      </div>
    </div>


</template>

<script>
import { db } from '@/firebase/index.js'
import {collection, getDocs, Timestamp} from 'firebase/firestore'
import { RouterLink } from "vue-router";

export default {
  components: { RouterLink },
  data() {
    return {
      pedidos: [],
      isPaused: false,
    }
  },

  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "pedidos"));
      this.pedidos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Erro ao recuperar pedidos:", error);
    }

  },

  methods: {

    toggleAnimation() {
      this.isPaused = !this.isPaused;
    },

    formatarData(timestamp) {
      if (timestamp instanceof Timestamp) {
        const date = timestamp.toDate();
        return date.toLocaleString();
      }
    },
  },

  computed: {
  pedidosFiltradosOrdenados() {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 20);

      return this.pedidos.filter(pedido => {
        const pedidoData = pedido.data?.toDate();
        return pedidoData >= dataLimite;
      }).sort((a, b) => {
        return b.data - a.data;
      });
    },
  }
}

</script>

<style lang="css" src="./oracoes.css" scoped/>
