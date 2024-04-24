<template>
  <div class="pedidos-campanha" v-for="pedido in campanhasOrdenadas" :key="pedido.id">
  {{pedido.pedido}}
  </div>
</template>

<script>
import {db} from '@/firebase/index.js'
import {collection, getDocs} from 'firebase/firestore'


export default {

  data() {
    return {
      campanha: []
    }
  },

  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "campanha"));
      this.campanha = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error) {
      console.error("Erro ao recuperar pedidos:", error);
    }
  },
  computed: {
    campanhasOrdenadas() {
      return this.campanha.slice().sort((a, b) => {
        return b.data - a.data;
      });
    }
  }
}
</script>

<style scoped lang="css" src="./verMuralCampanha.css"/>

