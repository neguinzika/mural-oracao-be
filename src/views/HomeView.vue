<template>
  <div class = "center">

    <h2>Faça seu pedido de Oração <br> e agradecimento</h2>


    <form @submit.prevent="submitForm">
    <label for="name" class="form-label"> Nome: </label>
      <div>
      <input  class="form-control2" v-model="name" placeholder="Digite seu nome (opcional)" >
      </div>
    <label for="oracao" class="form-label"> Pedido de Oração:</label><br>
    <textarea class="form-control" v-model="oracao" rows="9" placeholder="Digite aqui seu pedido de Oração" required></textarea>
    <br><br>
      <button style=color:blue;>Enviar Pedido</button>
    </form>

  </div>

</template>

<script>

import 'firebase/firestore'
import {addDoc, collection} from 'firebase/firestore'
import {db} from '../firebase'

export default {

  data() {
    return {
      name: '',
      oracao: ''
    }
  },

  methods: {
    async submitForm() {

      const docRef = await addDoc(collection(db,"pedidos", ),{
        name: this.name,
        oracao: this.oracao


      }).then(() => {
        this.name = '';
        this.oracao = '';
        alert("Pedido de Oração enviado com sucesso!")
      }).catch((error) => {
        alert("Erro ao enviar pedido de oração. Tente novamente mais tarde.")
        console.error("Erro ao enviar pedido de oração", error)
      });


    }

  }
  }


</script>