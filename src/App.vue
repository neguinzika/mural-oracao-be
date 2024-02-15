<template>
  <body style=background-color:steelblue>
  <div class="container">

    <div class="row mt-5">

      <div class="col-12">
        <label for="name" class="form-label"> <b> Nome: </b> </label>
        <input type="text" class="form-control" v-model="name" placeholder="Digite seu nome" required>
      </div>

      <div class="col-12">
        <br>
        <label for="oracao" class="form-label"> <b>Pedido de Oração:</b> </label>
        <textarea class="form-control" v-model="oracao" rows="5"
                  placeholder="Digite aqui seu pedido de Oração"></textarea>
      </div>

    </div>
    <br><br>
    <input @click="submitForm" style=color:blue; type="submit" value="Enviar Pedido">
  </div>

  </body>


</template>
<script>
import {getDatabase, ref, set, onValue} from "firebase/database";

export default {
  name: "App",
  data() {
    return {
      name: null,
      oracao: null,
    }
  },
  methods: {
    submitForm() {
      const database = getDatabase();
      set(ref(database, 'oracoes/' + this.name), {
        name: this.name,
        oracao: this.oracao,
      });
      alert("Pedido de Oração, enviado com sucesso")
      this.name = null
      this.oracao = null
    }
  },
  mounted: function () {
    const database = getDatabase()
    const reference = ref(database, "oracoes/")
    onValue(reference, el => {
      const data = el.val()
      console.log(data)
    })



  }
}
</script>