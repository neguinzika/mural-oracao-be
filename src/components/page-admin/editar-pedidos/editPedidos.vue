<template>
  <div class="conteiner-principal">
    <div class="page">
      <h2>Lista de Pedidos</h2>
      <button @click="excluirTodosPedidos" class="btndelAll">Excluir Todos os Pedidos</button>

      <div v-for="pedido in pedidossOrdenados" :key="pedido.id">
        <p>
          <strong>Nome:</strong> {{ pedido.name }}<br>
          <strong>Pedido de Oração:</strong> {{ pedido.oracao }}<br>
          <strong>Data:</strong> {{ formatarData(pedido.data) }}
        </p>
        <button class="btnEditar" @click="editPedido(pedido)">Editar</button>
        <br>
        <div v-if="pedidoSelecionado !== null && pedidoSelecionado.id === pedido.id">
          <div class="edicao">
            <h3>Editar Pedido</h3>
            <label for="nome">Nome:</label>
            <input  type="text" v-model="pedidoSelecionado.name">
            <label for="oracao">Pedido de Oração:</label>
            <textarea v-model="pedidoSelecionado.oracao"></textarea>
            <button class="btnSalvar"  @click="salvarEdicao">Salvar</button>
            <button class="btnCancelar" @click="cancelarEdicao">Cancelar</button>
            <button class="btnExcluir"  @click="excluirPedido(pedido.id)">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {db} from '@/firebase/index.js'
import {collection, deleteDoc, doc, getDocs, Timestamp, updateDoc} from 'firebase/firestore';

export default {
  data() {
    return {
      pedidos: [],
      pedidoSelecionado: null
    }
  },
  async mounted() {
    await this.getPedidos();
  },
  methods: {
    async getPedidos() {
      try {
        const querySnapshot = await getDocs(collection(db, "pedidos"));
        this.pedidos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      } catch (error) {
        console.error("Erro ao recuperar pedidos:", error);
      }
    },
    formatarData(timestamp) {
      if (timestamp instanceof Timestamp) {
        const date = timestamp.toDate();
        return date.toLocaleString();
      }
    },
    editPedido(pedido) {
      this.pedidoSelecionado = {...pedido};
    },
    async excluirPedido(pedidoId) {
      const confirmarExclusao = confirm("Tem certeza que quer excluir esse pedido ?");
      if (confirmarExclusao) {
        try {
          await deleteDoc(doc(db, "pedidos", pedidoId));
          await this.getPedidos();
          console.log("Pedido excluído com sucesso.");
        } catch (error) {
          console.error("Erro ao excluir pedido:", error);
        }
      }
    },
    async salvarEdicao() {
      try {
        await updateDoc(doc(db, "pedidos", this.pedidoSelecionado.id), {
          name: this.pedidoSelecionado.name,
          oracao: this.pedidoSelecionado.oracao
        });
        this.pedidoSelecionado = null;
        await this.getPedidos(); // Atualiza a lista de pedidos após edição
      } catch (error) {
        console.error("Erro ao salvar edição:", error);
      }
    },
    cancelarEdicao() {
      this.pedidoSelecionado = null;
    },
    async excluirTodosPedidos() {
      const confirmarExclusao = confirm("Tem certeza que deseja excluir todos os pedidos de Oração? Será impossível recupera-los");
      if (confirmarExclusao) {
        try {
          await Promise.all(this.pedidos.map(pedido => deleteDoc(doc(db, "pedidos", pedido.id))));
          await this.getPedidos();
          console.log("Todos os pedidos foram excluídos com sucesso.");
        } catch (error) {
          console.error("Erro ao excluir todos os pedidos:", error);
        }
      }
    },

  },
  computed: {
    pedidossOrdenados() {
      return this.pedidos.slice().sort((a, b) => {
        return b.data - a.data;
      });
    }
  }
}
</script>

<style lang="css" src="./editarPedidos.css" scoped />
