<template>
  <div class="flex items-center justify-center">
    <quiz-x-card class="p-8 py-10 max-w-lg w-full">
      <h2 class="text-2xl">Vamos começar!</h2>
      <p class="text-quiz-blue-100">É preciso estar logado para continuar</p>
      <quiz-input-text
        :model.sync="model"
        placeholder="Digite um nome de usuário"
        class="bg-quiz-blue-200 w-full mt-4"
      />
      <quiz-btn class="w-full mt-4" @click="loginUser">Entrar</quiz-btn>
    </quiz-x-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";
import Vue, { ref } from "vue";
import { useUserDataStore } from "~/store/userData";

const userStore = useUserDataStore();

const router = useRouter();

const model = ref<string>("");

function loginUser() {
  userStore.login(model.value);
  router.push("/");
}
</script>

<script lang="ts">
export default Vue.extend({
  layout: "login",
});
</script>
