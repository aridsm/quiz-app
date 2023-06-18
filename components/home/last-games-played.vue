<template>
  <section class="mt-28">
    <div class="flex items-center justify-between mb-4 leading-none">
      <quiz-x-title>Últimos jogos</quiz-x-title>
      <button class="text-quiz-blue flex items-center" @click="openHistory">
        Seu histórico <icon-quiz-arrow class="ml-2 w-3 -rotate-90" />
      </button>
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
            <div
              v-title="'Categoria'"
              class="w-20 text-left ml-12 text-sm text-quiz-grey-100"
            >
              {{ getCategoryData(game.category).name }}
            </div>
            <div v-title="'Acertos'" class="w-20 text-left ml-4">
              {{ game.correctQuestions }}/{{ game.totalQuestions }}
            </div>
            <div
              v-title="'Moedas ganhas'"
              class="w-20 text-left ml-4 flex items-center"
            >
              {{ game.earnedCoins }}
              <icon-quiz-coins class="w-4 ml-2" />
            </div>
            <div
              v-title="'Experiência ganha'"
              class="flex items-center w-20 text-left ml-4"
            >
              {{ game.earnedXp }} XP
            </div>
            <icon-quiz-xmark
              v-if="game.status === CurrentGameStatus.Failed"
              class="w-5 text-quiz-pink"
            />
            <icon-quiz-checkmark
              v-if="game.status === CurrentGameStatus.Done"
              class="w-5 text-quiz-blue"
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
