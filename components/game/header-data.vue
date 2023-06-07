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

    <p class="text-quiz-white mt-10">
      {{ currentGame.correctAnswers }} resposta{{
        correctAnswersIsOne ? "" : "s"
      }}
      correta{{ correctAnswersIsOne ? "" : "s" }}
    </p>
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
