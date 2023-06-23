<template>
  <quiz-modal-overlay
    :center="true"
    :model.sync="modalsStore.modals.modalInfosIsOpen"
  >
    <div class="sm:w-[38rem]">
      <h2 class="mb-4">Sobre o projeto</h2>
      <div class="max-h-[77vh] overflow-auto">
        <p class="text-quiz-grey-100 md:text-lg">
          Este projeto consiste em uma mini interface de quizzes divididos em
          categorias de biologia, geografia e matemática, com a possibilidade de
          o usuário configurar o número de perguntas, modo de pergunta e modo de
          resposta de acordo com o quiz selecionado.
        </p>
        <p class="text-quiz-grey-100 mt-4 md:text-lg">
          Novas perguntas e respostas são geradas toda vez que o usuário inicia
          uma nova partida, em ordens e com respostas diferentes.
        </p>
        <p class="text-quiz-grey-100 mt-4 md:text-lg">
          No momento, o projeto não possui um backend, então os dados como
          últimas partidas, dados do usuário e usuários existentes são salvos no
          localStorage do navegador. No entanto, esses dados podem ser excluídos
          ao clicar na opção “sair”.
        </p>
        <p class="text-quiz-grey-100 mt-4 md:text-lg">
          O projeto foi desenvolvido com Vue, Nuxt, Pinia, Typescript e
          Tailwind. A prototipagem foi feita com Figma. Algumas das perguntas
          dos quizzes foram geradas com o chatGPT. Para mais projetos acesse meu
          github =)
        </p>
      </div>
      <a
        href="https://github.com/aridsm"
        target="_blank"
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
