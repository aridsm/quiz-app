<template>
  <section class="mt-12 sm:mt-16 md:mt-20">
    <div class="flex items-center justify-between mb-4 leading-none">
      <quiz-x-title>Últimos jogos</quiz-x-title>
      <button class="text-quiz-blue flex items-center" @click="openHistory">
        Seu histórico
        <icon-quiz-arrow class="ml-1 md:ml-2 w-2 md:w-3 -rotate-90" />
      </button>
    </div>
    <ul class="flex flex-col gap-1 sm:gap-2 md:gap-3">
      <li v-for="game in lastGamesPlayedList" :key="game.id">
        <quiz-x-card
          class="w-full flex flex-col md:flex-row md:items-center justify-end md:gap-5 md:py-6 md:px-8"
        >
          <p class="flex-1">
            {{ game.name }}
          </p>
          <div class="flex flex-1 w-full items-center">
            <quiz-x-chip
              class="hidden lg:block"
              :color="getGameStatusData(game.status).color"
            >
              {{ getGameStatusData(game.status).name }}
            </quiz-x-chip>
            <div
              v-title="'Categoria'"
              class="lg:w-20 text-left mr-auto md:mr-3 md:ml-12 text-sm text-quiz-grey-100"
            >
              {{ getCategoryData(game.category).name }}
            </div>
            <div v-title="'Acertos'" class="w-10 lg:w-20 text-left md:ml-4">
              {{ game.correctQuestions }}/{{ game.totalQuestions }}
            </div>
            <div
              v-title="'Moedas ganhas'"
              class="w-10 lg:w-20 text-left md:ml-4 flex items-center"
            >
              {{ game.earnedCoins }}
              <icon-quiz-coins class="w-3 md:w-4 ml-2" />
            </div>
            <div
              v-title="'Experiência ganha'"
              class="w-10 lg:w-20 flex items-center text-left ml-1 md:ml-4 mr-2"
            >
              {{ game.earnedXp }} XP
            </div>
            <icon-quiz-xmark
              v-if="game.status === CurrentGameStatus.Failed"
              class="w-4 md:w-5 text-quiz-pink"
            />
            <icon-quiz-checkmark
              v-if="game.status === CurrentGameStatus.Done"
              class="w-4 md:w-5 text-quiz-blue"
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
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { ProfileOptions } from "~/enums/profileOptions";
import { useModals } from "~/store/modals";

const store = useLastGamesPlayed();
const modalStore = useModals();

const { lastGamesPlayed } = storeToRefs(store);

const lastGamesPlayedList = computed(() => {
  return lastGamesPlayed.value.slice(0, 4);
});

function openHistory() {
  modalStore.modals.modalProfile.isOpen = true;
  modalStore.modals.modalProfile.tabActived = ProfileOptions.History;
}
</script>
