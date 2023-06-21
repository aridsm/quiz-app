<template>
  <div class="flex flex-col items-center justify-center">
    <quiz-x-card
      class="p-3 sm:p-5 md:p-8 max-w-[26rem] md:max-w-[30rem] w-full login-card relative"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-lg sm:text-xl md:text-2xl">Vamos começar!</h2>
        <div
          v-title="
            'De 3 a 10 caracteres, apenas letras, números e os símbolos _ @ ou !'
          "
          class="hidden lg:block"
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
        class="bg-quiz-grey-200 w-full mt-2 md:mt-4"
        @input="usernameIsValid = undefined"
      />
      <p
        class="block lg:hidden mt-1 text-xs sm:text-sm md:text-base text-quiz-blue"
      >
        De 3 a 10 caracteres, apenas letras, números e os símbolos _ @ ou !
      </p>
      <quiz-btn class="w-full mt-3 md:mt-6" @click="loginUser">Entrar</quiz-btn>

      <img
        src="/shapes/square-blue.svg"
        class="absolute right-2 sm:-right-16 lg:-right-32 -bottom-20 w-12 md:w-16"
      />
      <img
        src="/shapes/square-blue.svg"
        class="absolute -left-20 sm:-left-32 lg:-left-48 -bottom-12 w-12 md:w-16"
      />
      <img
        src="/shapes/square-blue.svg"
        class="absolute -left-6 lg:-left-10 bottom-4 w-8 md:w-12 -z-10"
      />
      <img
        src="/shapes/square-pink.svg"
        class="absolute -left-1 sm:-left-8 lg:-left-24 -bottom-36 w-12 md:w-16"
      />
    </quiz-x-card>

    <p v-if="usernameIsValid === false" class="mt-2 text-sm text-quiz-pink">
      {{ error }}
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
const error = ref<string>("");
const usernameIsValid = ref<boolean | undefined>(undefined);

function loginUser() {
  const { isValid, messageError } = userStore.login(model.value);
  error.value = messageError;
  usernameIsValid.value = isValid;
  if (isValid) {
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
