<template>
  <div class="grid grid-cols-3 gap-5 items-start">
    <quiz-x-card class="col-span-1 w-full p-6 flex flex-col">
      <h2 class="text-[1.6rem] leading-snug">{{ currentGame.title }}</h2>
      <div aria-label="3 vidas restantes" class="flex gap-2 mt-2 mb-4">
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
        class="mt-4 w-full"
      />
      <quiz-btn class="mt-8 bg-quiz-blue-200 text-quiz-blue-100">
        Desistir
      </quiz-btn>
    </quiz-x-card>
    <game-multiple-choice v-if="gameHaveStarted" />
    <quiz-x-card v-else-if="gameFailed" class="cols-span-2">
      Ops! Não foi dessa fez!
    </quiz-x-card>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount } from "vue";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { useCurrentGame } from "~/store/currentGame";

const storeCurrentGame = useCurrentGame();

const { currentGame } = storeToRefs(storeCurrentGame);

const gameHaveStarted = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Started;
});

const gameSuccess = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Done;
});

const gameFailed = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Failed;
});

onBeforeUnmount(() => {
  storeCurrentGame.resetQuiz();
});
</script>
