<template>
  <div class="flex flex-col items-center justify-center">
    <quiz-x-card class="p-8 max-w-[30rem] w-full login-card relative">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl">Vamos começar!</h2>
        <div
          v-title="
            'De 3 a 10 caracteres, apenas letras, números e os símbolos _ @ ou !'
          "
        >
          <icon-quiz-infos
            class="w-5 hover:text-quiz-blue text-quiz-grey-100"
          />
        </div>
      </div>
      <p class="text-quiz-grey-100">É preciso estar logado para continuar</p>
      <quiz-input-text
        :model.sync="model"
        placeholder="Digite um nome de usuário"
        class="bg-quiz-grey-200 w-full mt-4"
        @input="usernameIsValid = undefined"
      />
      <quiz-btn class="w-full mt-6" @click="loginUser">Entrar</quiz-btn>

      <img
        src="/shapes/square-green.svg"
        class="absolute -right-32 -bottom-20 w-16"
      />
      <img
        src="/shapes/square-green.svg"
        class="absolute -left-48 -bottom-12 w-16"
      />
      <img
        src="/shapes/square-green.svg"
        class="absolute -left-10 bottom-4 w-12 -z-10"
      />
      <img
        src="/shapes/square-pink.svg"
        class="absolute -left-24 -bottom-36 w-16"
      />
    </quiz-x-card>

    <p v-if="usernameIsValid === false" class="mt-2 text-sm text-quiz-pink">
      Nome de usuário inválido!
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";
import Vue, { ref } from "vue";
import { useUserDataStore } from "~/store/userData";

const userStore = useUserDataStore();

const router = useRouter();

const model = ref<string>("");
const usernameIsValid = ref<boolean | undefined>(undefined);

function loginUser() {
  const login = userStore.login(model.value);
  usernameIsValid.value = login;
  if (login) {
    router.push("/");
  }
}
</script>

<script lang="ts">
export default Vue.extend({
  layout: "login",
});
</script>

<style scoped>
.login-card {
  box-shadow: 4px 4px 25px 0 rgba(13, 10, 31, 0.2);
}
</style>
