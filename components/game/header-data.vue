<template>
  <div class="col-span-1 w-full flex flex-col">
    <h2 class="text-[1.6rem] leading-snug mb-5">{{ currentGame.title }}</h2>
    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-4">
        <quiz-x-title>Vidas</quiz-x-title>
        <div class="flex gap-2">
          <icon-quiz-heart-empty
            v-for="live in currentGame.totalLives - currentGame.lives"
            :key="live * Math.random()"
            class="w-4 text-quiz-pink"
          />
          <icon-quiz-heart-fill
            v-for="live in currentGame.lives"
            :key="live * Math.random()"
            class="w-4 text-quiz-pink"
          />
        </div>
      </div>

      <div class="flex items-center gap-4">
        <quiz-x-title>Progresso</quiz-x-title>
        <span class="text-sm text-quiz-green-light">
          Pergunta {{ currentGame.currentQuestionIndex + 1 }} de
          {{ currentGame.totalQuestions }}
        </span>
      </div>

      <div class="flex items-center gap-4">
        <quiz-x-title>Respostas corretas</quiz-x-title>
        <p class="text-sm text-quiz-green-light">
          {{ currentGame.correctAnswers }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <quiz-x-title>Chances de pular</quiz-x-title>
        <p class="text-sm text-quiz-green-light">
          {{ currentGame.skipChances }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CurrentGame } from "~/interfaces/CurrentGame";

interface Props {
  currentGame: CurrentGame;
  started: boolean;
}

const props = defineProps<Props>();

const correctAnswersIsOne = computed(() => {
  return props.currentGame.correctAnswers === 1;
});
</script>

<style></style>
