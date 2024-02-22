<template>

  <div class="container">


    <div class="row">
      <div id="message-container" class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="max-height: 500px; overflow-y: scroll;">
      <div v-for="pedido in pedidos" :key="pedido.id" class="message">
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
      pedidos: []
    }
  },
  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "pedidos"));
      querySnapshot.forEach((doc) => {
        this.pedidos.push({ id: doc.id, ...doc.data() });
        setTimeout(scrollMessages, 400);
      });
    } catch (error) {
      console.error("Erro ao recuperar pedidos:", error);
    }
  }
}

function scrollMessages() {
  var container = document.getElementById("message-container");

  console.log(container.scrollHeight);
  console.log(container.scrollTop);

  container.scrollTo({top: container.scrollTop + 1, behavior: 'smooth'});

  setTimeout(scrollMessages, 10);

}

</script>

<style>



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


