<template>
  <quiz-x-card
    class="col-span-2 flex flex-col items-center w-full py-12 text-center min-h-fit md:min-h-[30rem]"
  >
    <div class="flex gap-2 text-quiz-blue justify-center mb-4">
      <icon-quiz-star-fill
        v-for="star in currentGame.stars"
        :key="star"
        class="w-8 h-8 md:w-10 md:h-10 star"
      />
      <icon-quiz-star-empty
        v-for="star in 3 - currentGame.stars"
        :key="star"
        class="w-8 h-8 md:w-10 md:h-10 star"
      />
    </div>
    <p class="mb-1 text-quiz-white text-[1.6rem] leading-none">
      {{ isSuccess ? "Muito bem! Você chegou ao final!" : "Que pena!" }}
    </p>
    <p v-if="!isSuccess">Não foi dessa vez!</p>
    <p class="text-quiz-grey-100 mt-3 md:mt-6">
      Você acertou {{ currentGame.correctAnswers }} de
      {{ currentGame.totalQuestions }} perguntas!
    </p>
    <div class="flex gap-10 mt-3 md:mt-8">
      <div v-title="'Experiência ganha'" class="text-quiz-blue text-4xl">
        + {{ currentGame.xpGained }} XP
      </div>

      <div v-title="'Moedas ganhas'" class="text-quiz-blue text-4xl flex gap-2">
        {{ currentGame.coinsGained }} <icon-quiz-coins class="w-6" />
      </div>
    </div>

    <quiz-btn class="mt-6 md:mt-auto" @click="playAgainHandler">
      Jogar novamente
    </quiz-btn>
    <nuxt-link class="mt-4 text-quiz-blue" to="/">
      Voltar à página inicial
    </nuxt-link>
  </quiz-x-card>
</template>

<script lang="ts" setup>
import { useRouter } from "@nuxtjs/composition-api";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { useCurrentGame } from "~/store/currentGame";

interface Props {
  currentGame: CurrentGame;
  isSuccess: boolean;
}

const router = useRouter();
const currentGameStore = useCurrentGame();

function playAgainHandler() {
  currentGameStore.resetQuiz(true);
  currentGameStore.createNewGame();
  // router.push("/game");
}

defineProps<Props>();
</script>

<style>
.star:nth-of-type(2) {
  @apply -mt-2;
}
</style>
