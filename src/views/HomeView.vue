<template>
  <div class="center">
    <h2>Faça seu pedido de Oração <br> e agradecimento</h2>

    <form @submit.prevent="submitForm">

      <label for="oracao" class="form-label">Pedidos de Orações:</label><br>

      <div id="lines">
        <div class="margin" v-for="(line, index) in lines" :key="index" v-show="showForm">
          <textarea class="form-control" v-model="line.text" rows="3" placeholder="Digite aqui seu pedido de Oração ou Agradecimento"
                    required></textarea> <br>
          <button class="tirar-linha" type="button" @click="removeLine(index)"></button>
        </div>
      </div>
      <br><br>
      <button class="colocar-linha" type="button" @click="addInput">Adicionar</button>

      <br><br>
      <button >Enviar Pedido</button>

    </form>
  </div>
</template>

<script>
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase';

export default {
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
