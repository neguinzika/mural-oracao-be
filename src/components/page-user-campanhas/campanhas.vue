<template>
  <div class="bg1">
  </div>
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

  <div class="main">

        <h2>Campanha de Oração
          <br> Sobre <br> <span>{{ MostrarTema }}</span></h2>

      <form @submit.prevent="submitCampanha">

        <label class="label1" for="123">Escreva seu pedido : </label>

        <div class="inputs">
          <div class="margin" v-for="(pedido, index) in pedidos" :key="index">
            <textarea  class="form-control" v-model="pedido.text" placeholder="Escreva aqui sua Oração" required></textarea><br>
            <button type="button" class="btnRemover" @click="removePedido(index)"></button>
          </div>
        </div>
        <br>

        <button type="button" class="btnAdicionar" @click="addPedido">Adicionar</button>
        <br><button type="submit" class="btnEnviar">Enviar</button>

      </form>
  </div>


</template>


<script>

import {db} from '@/firebase/index.js'
import {addDoc, collection, getDocs, serverTimestamp} from 'firebase/firestore'


export default {
  data() {
    return {
      MostrarTema: '',
      pedidoCampanha: '',
      pedidos: [{text: ''}]
    }
  },
  mounted: async function () {

    const querySnapshot = await getDocs(collection(db, "temaCampanha"));
    if (!querySnapshot.empty) {
      querySnapshot.forEach(doc => {
        if (doc.id === 'NaoApagar') {
          this.MostrarTema = doc.data().tema;
        }
      });
    }
  },
  methods: {
    async submitCampanha() {
      try {
        await Promise.all(this.pedidos.map(async (pedido) => {
          await addDoc(collection(db, "campanha"), {
            pedido: pedido.text,
            data: serverTimestamp()
          })
        }))
        this.pedidos = [{text: ''}]
        alert("Pedidos de Oração enviados com sucesso!")
      } catch (error) {
        alert("Erro ao enviar pedidos de Oração. Tente novamente mais tarde.")
        console.error("Erro ao enviar pedidos de Oração", error)
      }
    },
    addPedido() {
      this.pedidos.push({text: ''})
    },
    removePedido(index) {
      this.pedidos.splice(index, 1)
    }
  }
}


</script>
<style scoped lang="css" src="./campanhas.css"/>

