<template>
  <div class="relative">
    <the-header />
    <quiz-page-layout class="pt-[10.5rem]">
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <the-profile-modal />
    <the-game-settings-modal />
    <the-modal-alert />
    <the-modal-search />
    <div class="fixed bottom-4 right-4 flex flex-col items-end gap-4">
      <button v-title="'mensagens'" class="flex items-center mr-[6px]">
        <icon-quiz-paperplane class="w-5 text-quiz-blue" />
      </button>
      <button v-title="'sobre o projeto'" class="flex items-center mr-[6px]">
        <icon-quiz-infos class="w-5 text-quiz-grey-100" />
      </button>
      <button class="flex items-center gap-2">
        <span class="text-sm text-quiz-blue tracking-wider">Sair</span>
        <div class="bg-quiz-blue rounded-md p-2">
          <icon-quiz-exit class="w-4 text-quiz-blue-dark" />
        </div>
      </button>
    </div>
    <div class="w-80 h-80 fixed -top-28 bg-blur pointer-events-none" />
    <the-tooltip v-if="tooltip.isShown" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";
import { storeToRefs } from "pinia";
import { useTooltip } from "~/store/tooltip";

const tooltipStore = useTooltip();
const { tooltip } = storeToRefs(tooltipStore);
const router = useRouter();

router.beforeEach((_, _2, next) => {
  window.scrollTo(0, 0);
  next();
});
</script>

<style>
.bg-blur {
  left: 10rem;
  z-index: 99;
  background: #6b60ac9f;
  filter: blur(400px);
}
</style>
