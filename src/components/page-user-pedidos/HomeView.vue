<template>
  <div class="bg1">
    <header-page/>
<p>Sejam Bem-Vindos Ao Nosso Grupo de Oração</p>
  <div class="center">
    <h2>Descreva seu pedido de Oração <br> e agradecimento</h2>

    <form @submit.prevent="submitForm">

      <label for="oracao" class="form-label">Pedidos de Orações:</label><br>

      <div id="lines">
        <div class="margin" v-for="(line, index) in lines" :key="index" v-show="showForm">
          <textarea class="form-control" v-model="line.text" rows="3"
                    placeholder="Digite aqui seu pedido de Oração ou Agradecimento"
                    required></textarea> <br>
          <button class="tirar-linha" type="button" @click="removeLine(index)"></button>
        </div>
      </div>
      <br>
      <button class="colocar-linha" type="button" @click="addInput">Adicionar</button>
      <br>
      <button>Enviar Pedido</button>

    </form>
  </div>
  </div>
</template>

<script>
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '@/firebase/index.js';
import {RouterLink} from "vue-router";
import HeaderPage from "@/components/cabecalho-pages/headerPage.vue";


export default {
  components: {HeaderPage, RouterLink},
  data() {
    return {
      name: '',
      lines: [{text: ''}],
      showForm: true
    }
  },
  methods: {
    async submitForm() {
      try {
        await Promise.all(this.lines.map(async (line) => {
          await addDoc(collection(db, "pedidos"), {
            name: this.name,
            oracao: line.text,
            data: serverTimestamp()
          });
        }));
        this.name = '';
        this.lines = [{text: ''}];
        alert("Pedido de Oração enviado com sucesso!");
      } catch (error) {
        alert("Erro ao enviar pedido de oração. Tente novamente mais tarde.");
        console.error("Erro ao enviar pedido de oração", error);
      }
    },
    addInput() {
      if (!this.showForm) {
        this.showForm = true;
      }
      this.lines.push({text: ''});
    },
    removeLine(index) {
      this.lines.splice(index, 1);
    }
  }
}
</script>

<style lang="css" src="./homeView.css" scoped/>
