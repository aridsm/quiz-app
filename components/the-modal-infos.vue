<template>
  <quiz-modal-overlay
    :center="true"
    :model.sync="modalsStore.modals.modalInfosIsOpen"
  >
    <div style="max-width: 25rem">
      <h2 class="mb-4">Sobre o projeto</h2>
      <p class="text-quiz-grey-100">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        eveniet minima architecto officiis magnam nihil, qui laboriosam iste
        accusamus laborum. Ipsam, eum recusandae. Nesciunt ullam, facere maxime
        facilis dicta at!
      </p>
      <p class="text-quiz-grey-100 mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        eveniet minima architecto officiis magnam nihil, qui laboriosam iste
        accusamus laborum. Ipsam, eum recusandae. Nesciunt ullam, facere maxime
        facilis dicta at!
      </p>
      <a
        href="/"
        class="bg-quiz-blue text-quiz-blue-dark mt-4 block rounded-md py-3 px-7 text-center"
      >
        Mais projetos no github
      </a>
    </div>
  </quiz-modal-overlay>
</template>

<script setup lang="ts">
import { useModals } from "~/store/modals";

const modalsStore = useModals();
</script>
