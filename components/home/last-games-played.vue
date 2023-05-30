<template>
  <section class="mt-24">
    <div class="flex items-center justify-between mb-2">
      <quiz-x-title class="mb-0">Últimos jogos</quiz-x-title>
      <nuxt-link
        to="/"
        class="text-quiz-green-light flex items-center leading-none"
      >
        Seu histórico <icon-quiz-arrow class="ml-2 w-3 -rotate-90" />
      </nuxt-link>
    </div>
    <ul class="flex flex-col gap-5">
      <li v-for="game in lastGamesPlayedList" :key="game.id">
        <quiz-x-card class="w-full flex items-center gap-5 py-6 px-8">
          <p class="">
            {{ game.name }}
          </p>

          <div class="ml-auto flex items-center">
            <quiz-x-chip :color="getGameStatusData(game.status).color">{{
              getGameStatusData(game.status).name
            }}</quiz-x-chip>
            <span class="text-sm text-quiz-blue-100 w-20 text-left ml-12">
              {{ getCategoryData(game.category).name }}
            </span>

            <quiz-x-tooltip title="Acertos" class="w-20 text-left ml-4">
              {{ game.correctQuestions }}/{{ game.totalQuestions }}
            </quiz-x-tooltip>
            <quiz-x-tooltip
              title="Moedas ganhas"
              class="w-20 text-left ml-4"
              activator-classes="flex items-center"
            >
              {{ game.earnedCoinds }}
              <icon-quiz-coins class="w-4 ml-2" />
            </quiz-x-tooltip>
            <quiz-x-tooltip
              title="Experiência ganha"
              class="flex items-center w-20 text-left ml-4"
            >
              {{ game.earnedXp }} XP
            </quiz-x-tooltip>
            <icon-quiz-xmark
              v-if="game.status === GameStatus.Fail"
              class="w-5 text-quiz-pink"
            />
            <icon-quiz-checkmark
              v-if="game.status === GameStatus.Win"
              class="w-5 text-quiz-green-light"
            />
          </div>
        </quiz-x-card>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import getCategoryData from "../../utilities/getCategoryData";
import getGameStatusData from "../../utilities/getGameStatusData";
import { useLastGamesPlayed } from "~/store/lastGamesPlayed";
import { GameStatus } from "~/enums/gameStatus";

const store = useLastGamesPlayed();

const { lastGamesPlayed } = storeToRefs(store);

const lastGamesPlayedList = computed(() => {
  return lastGamesPlayed.value.slice(0, 4);
});
</script>

<style></style>
