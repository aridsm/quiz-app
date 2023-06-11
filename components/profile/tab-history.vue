<template>
  <div class="bg-quiz-blue-200 p-4">
    <quiz-x-title class="mb-5">Seu histórico</quiz-x-title>
    <ul class="flex flex-col max-h-[18rem]">
      <li
        v-for="game in lastGamesPlayed"
        :key="game.id"
        class="flex items-center item-list-history"
      >
        <div>
          <p class="leading-none">{{ game.name }}</p>
          <p class="leading-none mt-2 text-sm text-quiz-blue-100">
            {{ getCategoryData(game.category).name }}
          </p>
        </div>
        <quiz-x-tooltip
          title="Moedas ganhas"
          class="w-12 text-left ml-auto"
          activator-classes="flex items-center"
        >
          {{ game.earnedCoins }}
          <icon-quiz-coins class="w-3 ml-2" />
        </quiz-x-tooltip>
        <quiz-x-tooltip
          title="Experiência ganha"
          class="w-12 text-left ml-4"
          activator-classes="flex items-center"
        >
          {{ game.earnedXp }} XP
        </quiz-x-tooltip>

        <quiz-x-tooltip title="Derrota">
          <icon-quiz-xmark
            v-if="game.status === CurrentGameStatus.Failed"
            class="w-4 ml-2 text-quiz-pink"
          />
        </quiz-x-tooltip>

        <quiz-x-tooltip title="Vitória">
          <icon-quiz-checkmark
            v-if="game.status === CurrentGameStatus.Done"
            class="w-4 ml-2 text-quiz-green-light"
          />
        </quiz-x-tooltip>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { useLastGamesPlayed } from "~/store/lastGamesPlayed";
import getCategoryData from "~/utilities/getCategoryData";

const lastGamesStore = useLastGamesPlayed();
const { lastGamesPlayed } = storeToRefs(lastGamesStore);
</script>

<style scoped>
.item-list-history + .item-list-history {
  @apply border-t border-quiz-border pt-3 mt-3;
}
</style>
