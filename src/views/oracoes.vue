<template>
  <div id="container">
    <div id="message-container" class="col-md-3">
      <div v-for="pedido in pedidos" :key="pedido.id" class="message">

        <p>{{ pedido.oracao }}</p>

      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

export default {
  data() {
    return {
      pedidos: []
    }
  },
  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "pedidos"));
      querySnapshot.forEach((doc) => {

        this.pedidos.push({ id: doc.id, ...doc.data() });
      });
    } catch (error) {
      console.error("Erro ao recuperar pedidos:", error);
    }
  }
}
</script>

<style>

body {
  font-family: Calibre, sans-serif;
}

#container {
  max-height: 1%;
}

#message-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: scrollMessage 45s linear infinite;

}

@keyframes scrollMessage {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}


</style>






































<!-- <template>
  <div class="container">
    <div class="row">
      <div class="col-3 col-md-3">
        <div class="message-container">
        <p class="animated-text"  v-for="pedido in pedidos" :key="pedido.id">{{ pedido.oracao }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {db} from '../firebase'
import {addDoc, collection, query, where, getDocs} from 'firebase/firestore'

export default {
  data() {
    return {
      pedidos: []
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
  }
}

</script>

<style>

.animated-text {
  position: relative;
animation-delay: 1s;
  animation: scrollMessage 25s linear infinite;
}

@keyframes scrollMessage {
  0% {
    transform: translateY(50vmax);
  }
  100% {
    transform: translateY(-60vmax);
  }
}


/*
body {
  font-family: Calibre, sans-serif;


  word-break: break-word;
}

#container {
  display: flex;
  line-height: normal;
  overflow: scroll;
}

#message-container {

  display:inline-flex;
  flex-direction: column;
  align-items: center;
  animation: scrollMessage 1s linear;

.message {
  height: auto;
}
}


@keyframes scrollMessage {
  0% {
    transform: translateX(120%);
  }
  100% {
    transform: translateX(5px);
  }
}

.message {
  margin: -9px;
  padding: 0;
  color: rgb(15, 17, 15);
  font-size: 21px;
}

*/

</style>
!-->


