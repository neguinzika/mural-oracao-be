<template>


  <div id="container">
    <div id="message-container">
      <div class="message">Pela saúde física e mental de todos os que estão enfrentando doenças e dificuldades.</div>
      <div class="message"> Por aqueles que estão passando por momentos de angústia, para que encontrem conforto e paz.</div>
      <div class="message">Pelas famílias que estão enfrentando dificuldades financeiras, para que encontrem soluções e sustento.</div>
      <div class="message">Pelas vítimas de injustiça e violência, para que encontrem justiça e consolo.</div>
      <div class="message">Pela reconciliação e cura em relacionamentos familiares e comunitários.</div>
      <div class="message">Pela orientação e sabedoria daqueles que estão tomando decisões importantes.</div>
      <div class="message">Pelos líderes mundiais, para que trabalhem pela paz e justiça em todo o mundo</div>
      <div class="message">Pelos desabrigados e deslocados, para que encontrem abrigo, segurança e esperança.</div>
      <div class="message">Pelos trabalhadores da linha de frente da pandemia, para que sejam protegidos e fortalecidos.</div>
      <div class="message">Pela humildade e amor entre todas as pessoas, independentemente de suas diferenças.</div>

    </div>
  </div>
</template>

<script>

</script>

<style>
body {
  font-family: Calibre, sans-serif;
  margin: 2px;
  padding: 0;
}

#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: scroll;
}

#message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scrollMessage 6s linear;
}
.message {
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
  text-align: left;
  padding: 4px;
  color: rgb(15, 17, 15);
  font-size: 21px;
}

</style>



