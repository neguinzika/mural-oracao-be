<template>
  <header-page/>
  <div class="background"></div>

  <div class="main" v-for="campanha in campanhasOrdenadas" :key="campanha.id">
    {{ campanha.pedido }}
  </div>
</template>

<script>
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/index.js";
import {RouterLink} from "vue-router";
import HeaderPage from "@/components/cabecalho-pages/headerPage.vue";

export default {
  components: {HeaderPage, RouterLink},
  data() {
    return {
      campanhas: [],
    };
  },

  async mounted() {
    await this.getCampanhas();
  },

  methods: {
    async getCampanhas() {
      try {
        const querySnapshot = await getDocs(collection(db, "campanha"));
        this.campanhas = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      } catch (error) {
        console.error("Erro ao recuperar campanhas:", error);
      }
    }
  },

  computed: {
    campanhasOrdenadas() {
      return this.campanhas.slice().sort((a, b) => {
        return b.data - a.data;
      });
    }
  }
}
</script>

<style scoped lang="css" src="./muralCampanha.css"/>


