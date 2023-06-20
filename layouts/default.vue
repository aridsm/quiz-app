<template>
  <div class="relative">
    <the-header />
    <quiz-page-layout class="pt-28 md:pt-[9rem] lg:pt-[10.5rem]">
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <the-profile-modal />
    <the-game-settings-modal />
    <the-modal-alert />
    <the-modal-search />
    <the-modal-infos />
    <div class="fixed bottom-4 right-4 flex flex-col items-end gap-4">
      <button
        v-title="'sobre o projeto'"
        aria-label="sobre o projeto"
        class="flex items-center mr-[6px]"
        @click="openInfosModal"
      >
        <icon-quiz-infos class="w-5 text-quiz-grey-100" />
      </button>
      <button class="flex items-center gap-2" @click="logout">
        <span class="text-sm text-quiz-blue tracking-wider">Sair</span>
        <div class="bg-quiz-blue rounded-md p-2">
          <icon-quiz-exit class="w-4 text-quiz-blue-dark" />
        </div>
      </button>
    </div>
    <div
      class="w-52 h-52 lg:w-80 lg:h-80 fixed blur-[200px] lg:blur-[400px] -top-14 lg:-top-28 bg-blur pointer-events-none"
    />
    <the-tooltip v-if="tooltip.isShown" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";
import { storeToRefs } from "pinia";
import Vue from "vue";
import { useModals } from "~/store/modals";
import { useTooltip } from "~/store/tooltip";
import { useUserDataStore } from "~/store/userData";

const storeModals = useModals();
const tooltipStore = useTooltip();
const useUser = useUserDataStore();
const { tooltip } = storeToRefs(tooltipStore);
const router = useRouter();

router.beforeEach((_, _2, next) => {
  window.scrollTo(0, 0);
  next();
});

function openInfosModal() {
  storeModals.modals.modalInfosIsOpen = true;
}

function logout() {
  useUser.logout();
  router.push("/login");
}
</script>

<script lang="ts">
export default Vue.extend({
  middleware: ["auth"],
});
</script>

<style>
.bg-blur {
  left: 10rem;
  z-index: 99;
  background: #6b60ac9f;
}
</style>
