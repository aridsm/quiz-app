<template>
  <quiz-modal-overlay :model.sync="modalIsOpen">
    conteúdo da modal
  </quiz-modal-overlay>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const modalIsOpen = ref<boolean>(false);
</script>
