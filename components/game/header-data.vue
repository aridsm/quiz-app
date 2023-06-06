<template>
  <div class="col-span-1 w-full flex flex-col">
    <h2 class="text-[1.6rem] leading-snug">{{ currentGame.title }}</h2>
    <div aria-label="3 vidas restantes" class="flex gap-2 mt-2 mb-5">
      <icon-quiz-heart-empty
        v-for="live in 3 - currentGame.lives"
        :key="live"
        class="w-6 text-quiz-pink"
      />
      <icon-quiz-heart-fill
        v-for="live in currentGame.lives"
        :key="live"
        class="w-6 text-quiz-pink"
      />
    </div>
    <span class="text-sm text-quiz-green-light">
      Pergunta {{ currentGame.currentQuestionIndex + 1 }} de
      {{ currentGame.totalQuestions }}
    </span>
    <quiz-progress-bar
      :max-value="currentGame.totalQuestions"
      :value="currentGame.currentQuestionIndex + 1"
      :show-value="true"
      class="mt-8 w-full"
    />
    <quiz-btn
      :disabled="!started"
      class="mt-12 bg-quiz-blue-200 text-quiz-blue-100"
    >
      Desistir
    </quiz-btn>
  </div>
</template>

<script setup lang="ts">
import { CurrentGame } from "~/interfaces/CurrentGame";

interface Props {
  currentGame: CurrentGame;
  started: boolean;
}

defineProps<Props>();
</script>

<style></style>
