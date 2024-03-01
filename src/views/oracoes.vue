<template>
  <div class="filter">
    <input type="date" v-model="dataInicio">
    <input type="date" v-model="dataFim">
    <button class="pause" @click="startAnimation"></button>
  </div>
  <div class="container">
    <div id="message-container" :class="{ 'paused': isPaused }">
      <div v-for="pedido in pedidosFiltrados" :key="pedido.id" class="message">
        <p>{{ pedido.oracao }}</p>
      </div>
    </div>
  </div>

</template>

<script>


import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'

export default {
  data() {
    return {
      pedidos: [],
      dataInicio: '',
      dataFim: '',
      isPaused: true
    }
  },
  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "pedidos"));
      querySnapshot.forEach((doc) => {
        this.pedidos.push({id: doc.id, ...doc.data()});
      });
    } catch (error) {
      console.error("Erro ao recuperar pedidos:", error);
    }
  },
  methods: {
    startAnimation() {
      const container = document.getElementById('message-container');
      container.classList.toggle('paused');
      this.isPaused = !this.isPaused;
    }
  },
  computed: {
    pedidosFiltrados() {
      let startDate = new Date(this.dataInicio);
      let endDate = new Date(this.dataFim);
      return this.pedidos.filter(pedido => {
        const pedidoData = pedido.data?.toDate();
        return (!this.dataInicio || pedidoData >= startDate) && (!this.dataFim || pedidoData <= endDate);
      });
    }
  }
}

</script>

<style>

.filter {
  position: absolute;
  top: 0;
  z-index: 6;
}

.filter input {
  border: none;
  background: silver
}

.pause {
  padding: 5px;
  width: 26px;
  height: 25px;
  background-size: cover;
  background-image: url("../assets/pause-play.png");

}

.container {
  overflow: hidden;
  text-align: center;
  justify-content: center;
  display: flex;
  height: 100vh;
  width: 80vw;
  margin: 0 auto;
}

.message {
  text-shadow: 1px 1px 10px #ffffff;
}

#message-container {
  z-index: 5;
  overflow-y: auto;
  display: flex;
  height: 100vh;
  width: 75vw;
  position: relative;
  word-wrap: break-word;
  flex-direction: column;
  animation: scrollMessage 50s linear;
}

#message-container.paused {
  animation-play-state: paused;
}


  @keyframes scrollMessage {
    0% {
      transform: translateY(-110%);
    }
    100% {
      transform: translateY(100%);
    }
  }


</style>