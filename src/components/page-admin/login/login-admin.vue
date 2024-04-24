<template>
  <div class="main">
    <div class="content-login">
      <div class="bg">
        <h1>Mural de Oração</h1>
        <p>Login para Casa Branca</p>
        <form action="">

          <div class="form-group">
            <label for="senha">Senha: </label><br>
            <input v-model="senha" id="senha" class="input-group" type="password" placeholder="Digite sua Senha">
            <span v-if="senhaIncorreta" class="mensagem-erro">Senha incorreta, tente novamente.</span>
          </div>
          <button @click.prevent="login">Hackear</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>


export default {

  data() {
    return {
      senha: '',
      senhaIncorreta: false,

    }
  },
  methods: {

    login() {
      if (this.senha === '12345') {
        this.$router.push({ name: 'admin'});

      } else {
        this.senhaIncorreta = true;
      }
      // window.open('/admin', '_blank');
    }
  }
}

</script>

<style lang="css" src="./login-admin.css" scoped/>

