<template>
  <quiz-modal-overlay :center="true" :model.sync="modals.modalAlert.isOpen">
    <div class="flex flex-col gap-3">
      <p>Tem certeza?</p>
      <p class="text-quiz-grey-100">
        {{ modals.modalAlert.message }}
      </p>
      <div class="flex justify-between mt-2">
        <quiz-btn
          class="bg-quiz-grey-200 text-quiz-grey-100"
          @click="modals.modalAlert.isOpen = false"
        >
          Cancelar
        </quiz-btn>
        <quiz-btn @click="onConfirm">Confirmar</quiz-btn>
      </div>
    </div>
  </quiz-modal-overlay>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useModals } from "~/store/modals";

const modalsStore = useModals();
const { modals } = storeToRefs(modalsStore);

function onConfirm() {
  const confirm = modals.value.modalAlert.onConfirm;
  if (typeof confirm === "function") {
    console.log(typeof confirm);
    confirm();
  }
  modals.value.modalAlert.isOpen = false;
}
</script>

<style></style>
