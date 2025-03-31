<template>
  <div class="mudarTema">
    <form @submit.prevent="submitTema">
      <label for="theme">Tema: </label>
      <input id="theme" v-model="tema" type="text">
      <button type="submit">Alterar Tema</button>
    </form>
  </div>
  <span v-if="temaAlterado"
        class="aviso-campanha">O Tema de Oração da Campanha foi Alterado para "{{ MostrarTema }}".</span>
  <div class="conteiner-principal">
    <div class="page">
      <h2>Pedidos da Campanha</h2>
      <button @click="excluirTodasCampanhas" class="btndelAll">Excluir Todos os Pedidos</button>
      <div v-for="campanha in campanhasOrdenadas" :key="campanha.id">
        <p>
          <strong>Pedido:</strong> {{ campanha.pedido }}<br>
        </p>
        <button @click="editCampanha(campanha)">Editar</button>
        <br>
        <div v-if="campanhaSelecionada !== null && campanhaSelecionada.id === campanha.id">
          <div class="edicao">
            <h3>Editar Campanha</h3>
            <label for="descricao">Descrição:</label>
            <textarea v-model="campanhaSelecionada.pedido"></textarea>
            <button class="btnSalvar" @click="salvarEdicao">Salvar</button>
            <button class="btnCancelar" @click="cancelarEdicao">Cancelar</button>
            <button class="btnExcluir" @click="excluirCampanha(campanha.id)">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase/index.js";

export default {
  data() {
    return {
      tema: '',
      temaAlterado: false,
      MostrarTema: '',
      campanhas: [],
      campanhaSelecionada: null
    }
  },

  async mounted() {
    await this.getCampanhas();
    await this.getTema();
  },

  methods: {
    async getTema() {
      const querySnapshot = await getDocs(collection(db, "temaCampanha"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
          if (doc.id === 'NaoApagar') {
            this.MostrarTema = doc.data().tema;
          }
        });
      }
    },
    async submitTema() {
      const idDocumento = 'NaoApagar';
      await setDoc(doc(db, "temaCampanha", idDocumento), {
        tema: this.tema,
      });
      this.temaAlterado = true;
      this.MostrarTema = this.tema;
      this.tema = ''
    },
    async getCampanhas() {
      try {
        const querySnapshot = await getDocs(collection(db, "campanha"));
        this.campanhas = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      } catch (error) {
        console.error("Erro ao recuperar campanhas:", error);
      }
    },
    editCampanha(campanha) {
      this.campanhaSelecionada = {...campanha};
    },
    async excluirCampanha(campanhaId) {
      const confirmarExclusao = confirm("Tem certeza que deseja excluir esse Pedido?");
      if (confirmarExclusao) {
        try {
          await deleteDoc(doc(db, "campanha", campanhaId));
          await this.getCampanhas();
          console.log("Campanha excluída com sucesso.");
        } catch (error) {
          console.error("Erro ao excluir campanha:", error);
        }
      }
    },
    async salvarEdicao() {
      try {
        await updateDoc(doc(db, "campanha", this.campanhaSelecionada.id), {
          pedido: this.campanhaSelecionada.pedido,
        });
        this.campanhaSelecionada = null;
        await this.getCampanhas();
      } catch (error) {
        console.error("Erro ao salvar edição:", error);
      }
    },
    cancelarEdicao() {
      this.campanhaSelecionada = null;
    },
    async excluirTodasCampanhas() {
      const confirmarExclusao = confirm("Tem certeza que deseja excluir todos os pedidos da campanha? Será impossível recupera-los");
      if (confirmarExclusao) {
        try {
          await Promise.all(this.campanhas.map(campanha => deleteDoc(doc(db, "campanha", campanha.id))));
          await this.getCampanhas();
        } catch (error) {
          console.error("Erro ao excluir todas as campanhas:", error);
        }
      }
    },
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

<style scoped lang="css" src="./editCampanhas.css"/>

