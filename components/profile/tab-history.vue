<template>
  <div class="bg-quiz-blue-200">
    <div class="flex justify-between items-center px-6 py-4">
      <p class="text-quiz-blue-100">Seu histórico</p>
      <quiz-input-text
        :model.sync="searchValue"
        placeholder="Procure por uma partida..."
        class="py-3 text-base text-quiz-blue-100"
        style="background: #43397e; width: 15rem"
        @input="onSearchHistory"
      />
    </div>
    <div class="py-4 px-6 pt-0 h-[20rem] overflow-auto list-history">
      <ul class="flex flex-col gap-2">
        <li
          v-for="game in gamesList"
          :key="game.id"
          class="flex items-center p-4 bg-[#43397E] rounded-sm"
        >
          <div>
            <p class="leading-none">{{ game.name }}</p>
            <p class="leading-none mt-2 text-base text-quiz-blue-100">
              {{ getCategoryData(game.category).name }}
            </p>
          </div>
          <div v-title="'Acertos'" class="ml-auto w-10 text-left text-base">
            {{ game.correctQuestions }}/{{ game.totalQuestions }}
          </div>

          <div
            v-title="'Moedas ganhas'"
            class="w-10 text-left flex items-center text-base ml-4"
          >
            {{ game.earnedCoins }}
            <icon-quiz-coins class="w-3 ml-2" />
          </div>
          <div
            v-title="'Experiência ganha'"
            class="w-10 text-left ml-4 text-base"
          >
            {{ game.earnedXp }} XP
          </div>

          <div v-title="'Derrota'">
            <icon-quiz-xmark
              v-if="game.status === CurrentGameStatus.Failed"
              class="w-4 h-4 text-quiz-pink"
            />
          </div>

          <div v-title="'Vitória'" class="h-4">
            <icon-quiz-checkmark
              v-if="game.status === CurrentGameStatus.Done"
              class="w-4 text-quiz-green-light"
            />
          </div>
        </li>
      </ul>
      <p v-if="!gamesList.length" class="text-center">
        Parece que há nada aqui!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { GamePlayed } from "~/interfaces/GamePlayed";
import { useLastGamesPlayed } from "~/store/lastGamesPlayed";
import getCategoryData from "~/utilities/getCategoryData";

const lastGamesStore = useLastGamesPlayed();
const { lastGamesPlayed } = storeToRefs(lastGamesStore);

const searchValue = ref<string>("");
const gamesList = ref<GamePlayed[]>(lastGamesPlayed.value);

function onSearchHistory() {
  gamesList.value = lastGamesStore.searchGame(searchValue.value);
}
</script>

<style scoped>
.list-history::-webkit-scrollbar-thumb {
  @apply bg-quiz-green-light;
}

.list-history::-webkit-scrollbar {
  width: 6px;
}
</style>
