<template>
  <div class="filter">
    <input type="date" v-model="dataInicio">
    <input type="date" v-model="dataFim">
    <button class="pause" @click="toggleAnimation"></button>
  </div>
  <div class="scroll">
    <div class="container">
      <div id="message-container" :class="{ 'paused': isPaused }" >
          <!-- :style="{ '--animation-duration': animationDuration }">-->
        <div v-for="pedido in pedidosFiltrados" :key="pedido.id" class="message">
          <p>{{ pedido.oracao }}</p>
        </div>
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
      this.pedidos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error) {
      console.error("Erro ao recuperar pedidos:", error);
    }
  },
  methods: {
    toggleAnimation() {
      this.isPaused = !this.isPaused;
    }
  },
  computed: {
    pedidosFiltrados() {
      const startDate = new Date(this.dataInicio);
      const endDate = new Date(this.dataFim);
      return this.pedidos.filter(pedido => {
        const pedidoData = pedido.data?.toDate();
        return (!this.dataInicio || pedidoData >= startDate) && (!this.dataFim || pedidoData <= endDate);
      });
    },

    /*animationDuration() {
      const minDuration = 1;
      const maxDuration = 50;
      const numMessages = this.pedidosFiltrados.length;
      const duration = Math.max(minDuration, Math.min(maxDuration, numMessages * 3));
      return `${duration}s`;
    }*/
  }
}
</script>

<style>
.filter {
  text-align: left;
  position: relative;
  top: 0;
  z-index: 6;
}

.filter input {
  border: none;
  background: silver;
  cursor: pointer;
  margin-left: 5px;
}

.pause {
  margin-left: 10px;
  padding: 5px;
  width: 26px;
  height: 25px;
  background-size: cover;
  background-image: url("../assets/pause-play.png");
}


.message {
  text-shadow: 1px 1px 10px #ffffff;
}

.scroll {
  overflow-y: auto;
  height: 100vh;
}

.container {
  justify-content: center;
  width: 80vw;
  margin: 0 auto;
}

#message-container {
  z-index: 5;
  width: 75vw;
  word-wrap: break-word;
  animation: scrollMessage 45s linear;
}

#message-container.paused {
  animation-play-state: paused;
}


@keyframes scrollMessage {
  0% {
    transform: translateY(-110%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>