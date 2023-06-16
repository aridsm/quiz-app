<template>
  <div class="relative">
    <the-header />
    <quiz-page-layout class="pt-[10.5rem]">
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <the-profile-modal />
    <the-game-settings-modal />
    <div class="fixed bottom-4 right-4">
      <button class="flex items-center gap-2">
        <span class="text-sm text-quiz-blue">Sair</span>
        <div class="bg-quiz-blue rounded-md p-2">
          <icon-quiz-exit class="w-4 text-quiz-blue" />
        </div>
      </button>
    </div>
    <div class="w-80 h-80 fixed -top-28 bg-blur pointer-events-none" />
    <the-tooltip v-if="tooltip.isShown" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTooltip } from "~/store/tooltip";

const tooltipStore = useTooltip();
const { tooltip } = storeToRefs(tooltipStore);
</script>

<style>
.bg-blur {
  left: 10rem;
  z-index: 99;
  background: #6b60ac9f;
  filter: blur(400px);
}
</style>
