<template>
  <div class="relative">
    <the-header />
    <quiz-page-layout class="pt-24 sm:pt-28 md:pt-[9rem] lg:pt-[10.5rem]">
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <the-profile-modal />
    <the-game-settings-modal />
    <the-modal-alert />
    <the-modal-search />
    <the-modal-infos />
    <div class="hidden xl:flex fixed bottom-4 right-4 flex-col items-end gap-4">
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
    <div class="blur" />
    <the-tooltip v-if="tooltip.isShown" class="hidden lg:block" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";
import { storeToRefs } from "pinia";
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
export default {
  middleware: ["auth"],
};
</script>
