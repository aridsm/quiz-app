<template>
  <quiz-x-card
    class="col-span-2 flex flex-col items-center w-full py-12 text-center min-h-[30rem]"
  >
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
    <p v-if="isSuccess" class="text-quiz-blue-100 text-">
      Você acertou {{ currentGame.correctAnswers }} de
      {{ currentGame.totalQuestions }} perguntas!
    </p>
    <p v-else>Não foi dessa fez!</p>
    <div class="flex gap-10 mt-8">
      <quiz-x-tooltip
        title="Experiência ganha"
        activator-classes="text-quiz-green-light text-4xl"
      >
        + {{ currentGame.xpGained }} XP
      </quiz-x-tooltip>

      <quiz-x-tooltip
        title="Experiência ganha"
        activator-classes="text-quiz-green-light text-4xl"
      >
        <div class="flex gap-2">
          {{ currentGame.coinsGained }} <icon-quiz-coins class="w-6" />
        </div>
      </quiz-x-tooltip>
    </div>

    <quiz-btn class="mt-auto" @click="$router.push('/')">
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
