<template>
  <quiz-modal-overlay
    :center="true"
    :model.sync="modalsStore.modals.modalInfosIsOpen"
  >
    <div style="max-width: 28rem">
      <h2 class="mb-4">Sobre o projeto</h2>
      <p class="text-quiz-grey-100">
        Esse projeto consiste em uma mini aplicação de quizzes.
      </p>
      <p class="text-quiz-grey-100 mt-4">
        Desenvolvido com Vue, Nuxt, Pinia, Typescript e Tailwind. Prototipagem
        feita com Figma. Algumas das perguntas dos quizzes foram geradas com o
        chatGPT. Mais projetos disponíveis no meu github =)
      </p>
      <a
        href="https://github.com/aridsm"
        class="bg-quiz-blue text-quiz-blue-dark hover:bg-quiz-blue-hover active:bg-quiz-blue-active mt-4 block rounded-md py-2 md:py-3 px-3 md:px-7 text-center"
      >
        Acessar github
      </a>
    </div>
  </quiz-modal-overlay>
</template>

<script setup lang="ts">
import { useModals } from "~/store/modals";

const modalsStore = useModals();
</script>
