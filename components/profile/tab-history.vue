<template>
  <div class="bg-quiz-grey-400 rounded-md border-2 border-quiz-border">
    <div class="flex justify-between items-center px-3 sm:px-6 py-4">
      <p class="text-quiz-grey-100">Seu histórico</p>
      <quiz-input-text
        :model.sync="searchValue"
        placeholder="Procure por uma partida..."
        class="py-3 text-base text-quiz-grey-100 w-44 sm:w-56"
        style="background: #1f202c"
        @input="onSearchHistory"
      />
    </div>
    <div class="py-4 px-3 sm:px-6 pt-0 sm:h-[20rem] overflow-auto list-history">
      <ul class="flex flex-col gap-1 sm:gap-2">
        <li
          v-for="game in gamesList"
          :key="game.id"
          class="flex flex-col sm:flex-row sm:items-center p-3 sm:p-4 bg-quiz-grey-300 border-2 border-quiz-border rounded-md"
        >
          <p class="leading-none block sm:hidden">{{ game.name }}</p>
          <div class="w-full flex items-center justify-between">
            <div>
              <p class="leading-none hidden sm:block">{{ game.name }}</p>
              <p class="leading-none sm:mt-2 text-quiz-grey-100">
                {{ getCategoryData(game.category).name }}
              </p>
            </div>
            <div class="flex items-center">
              <div v-title="'Acertos'" class="w-7 sm:w-10 text-left">
                {{ game.correctQuestions }}/{{ game.totalQuestions }}
              </div>

              <div
                v-title="'Moedas ganhas'"
                class="w-7 sm:w-10 text-left flex items-center ml-3 sm:ml-4"
              >
                {{ game.earnedCoins }}
                <icon-quiz-coins class="w-3 ml-2" />
              </div>
              <div
                v-title="'Experiência ganha'"
                class="w-10 text-left ml-3 sm:ml-4"
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
                  class="w-4 text-quiz-blue"
                />
              </div>
            </div>
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
  @apply bg-quiz-blue;
}

.list-history::-webkit-scrollbar {
  width: 6px;
}

@media all and (max-width: 640px) {
  .list-history {
    max-height: calc(100vh - 17rem);
  }
}
</style>
