<template>
  <div class = "center">

    <h1>
      Faça seu pedido de Oração
    </h1>
    <label for="name" class="form-label"> Nome: </label>
      <div>
      <input  class="form-control" v-model="name" placeholder="Digite seu nome" required>
      </div>
    <label for="oracao" class="form-label"> Pedido de Oração:</label><br>

    <textarea class="form-control" v-model="oracao" rows="9" placeholder="Digite aqui seu pedido de Oração"></textarea>

    <br><br>

    <form>
    <button  v-on:click="submitForm" style=color:blue;>Enviar Pedido</button>
    </form>

  </div>

</template>

<script>

import {collection ,addDoc , } from 'firebase/firestore'
import 'firebase/firestore'
import {db} from "@/firebase/index.js";


export default {

  methods: {
    async submitForm() {

      const docRef = await addDoc(collection(db,"pedidos"),{
        name: this.name,
        oracao: this.oracao

      })

    }

  }
  }


</script>