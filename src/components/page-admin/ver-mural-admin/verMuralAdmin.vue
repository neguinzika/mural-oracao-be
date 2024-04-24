<template>
  <div class="background1">
    <h1>Mural de Orações</h1>
    <div class="scroll">
      <div class="container">
          <div v-for="pedido in pedidosOrdenados" :key="pedido.id" class="message">
            <p>{{ pedido.oracao }}</p>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import {db} from '@/firebase/index.js'
import {collection, getDocs} from 'firebase/firestore'
import {RouterLink} from "vue-router";


export default {
  components: {RouterLink},
  data() {
    return {
      pedidos: [],
    }
  },
  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "pedidos"));
      this.pedidos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error) {
      console.error("Erro ao recuperar pedidos:", error);
    }
  },
  computed: {
    pedidosOrdenados() {
      return this.pedidos.slice().sort((a, b) => {
        return b.data - a.data;
      });
    }
  }
}
</script>

<style scoped lang="css" src="./verMuralAdmin.css"/>

