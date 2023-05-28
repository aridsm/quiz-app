<template>
  <div class="flex items-center justify-center">
    <quiz-card class="p-8 py-10 max-w-lg w-full">
      <h2 class="text-2xl">Vamos começar!</h2>
      <p class="text-quiz-blue-100">É preciso estar logado para continuar</p>
      <quiz-input-text
        :model.sync="inputValue"
        placeholder="Digite um nome de usuário"
        class="bg-quiz-blue-200 w-full mt-4"
      />
      <quiz-btn class="w-full mt-4">Entrar</quiz-btn>
    </quiz-card>
  </div>
</template>

<script setup lang="ts">
import Vue, { ref } from "vue";

const inputValue = ref<string>("");
</script>

<script lang="ts">
export default Vue.extend({
  layout: "login",
});
</script>
