<template>
  <quiz-x-card
    class="p-6 relative cursor-pointer hover:border-quiz-green-light overflow-hidden transition hover:bg-quiz-blue-200 h-48 flex flex-col justify-center items-center"
  >
    <p class="text-[1.6rem] max-w-[12rem] leading-snug">{{ title }}</p>
    <router-link to="/" class="hidden">Jogar agora</router-link>
    <quiz-x-chip v-if="chip" class="absolute top-0 right-0" :color="chip.color">
      {{ chip.chipName }}
    </quiz-x-chip>
  </quiz-x-card>
</template>

<script lang="ts" setup>
import { ChipColors } from "~/enums/chipColors";

interface Props {
  title: string;
  chip?: {
    color: ChipColors;
    chipName: string;
  };
}

defineProps<Props>();
</script>
