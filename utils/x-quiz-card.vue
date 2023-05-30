<template>
  <quiz-x-card
    class="quiz-card py-6 px-20 relative cursor-pointer overflow-hidden transition hover:bg-quiz-blue-200 h-48 flex flex-col justify-center items-start"
  >
    <p class="text-[1.6rem] leading-snug">{{ title }}</p>
    <router-link
      to="/"
      class="play-now-link scale-y-0 h-0 overflow-hidden transition text-quiz-green-light text-left flex items-center justify-start"
    >
      Jogar agora
      <icon-quiz-arrow class="h-4 w-4 text-quiz-green-light -rotate-90 ml-2" />
    </router-link>
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

<style scoped>
.quiz-card:hover {
  box-shadow: 0 0 0 2px #59ff88;
}

.quiz-card:hover .play-now-link {
  @apply scale-y-100 h-auto;
}
</style>
