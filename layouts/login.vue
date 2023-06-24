<template>
  <div class="flex flex-col h-screen relative">
    <header
      class="h-[4.5rem] lg:h-[5.5rem] flex justify-center items-center text-2xl"
    >
      <the-logo />
    </header>
    <quiz-page-layout
      class="flex-1 pt-12 sm:pt-16 md:pt-24 lg:pt-28"
      style="min-height: auto"
    >
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <div class="bg-blur" />
    <the-tooltip v-if="tooltip.isShown" class="hidden lg:block" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTooltip } from "~/store/tooltip";

const tooltipStore = useTooltip();
const { tooltip } = storeToRefs(tooltipStore);
</script>
