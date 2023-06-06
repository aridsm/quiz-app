<template>
  <quiz-x-card class="col-span-2 w-full py-12 text-center">
    <div class="flex gap-2 text-quiz-green-light justify-center mb-4">
      <icon-quiz-star-fill
        v-for="star in currentGame.stars"
        :key="star"
        class="w-8 h-8 star"
      />
      <icon-quiz-star-empty
        v-for="star in 3 - currentGame.stars"
        :key="star"
        class="w-8 h-8 star"
      />
    </div>
    <p class="mb-1 text-quiz-green-light text-[1.6rem]">
      {{ isSuccess ? "Muito bem!" : "Que pena!" }}
    </p>
    <p v-if="isSuccess" class="text-quiz-blue-100">
      Você acertou {{ currentGame.correctAnswers }} de
      {{ currentGame.totalQuestions }} perguntas!
    </p>
    <p v-else>Não foi dessa fez!</p>
    <quiz-x-tooltip
      title="Experiência ganha"
      activator-classes="mb-6 mt-5 text-quiz-green-light text-[1.6rem]"
    >
      + {{ currentGame.xpGained }} XP
    </quiz-x-tooltip>
    <quiz-btn @click="$router.push('/')">
      Voltar para a página inicial
    </quiz-btn>
  </quiz-x-card>
</template>

<script lang="ts" setup>
import { CurrentGame } from "~/interfaces/CurrentGame";

interface Props {
  currentGame: CurrentGame;
  isSuccess: boolean;
}

defineProps<Props>();
</script>

<style>
.star:nth-of-type(2) {
  @apply -mt-2;
}
</style>
