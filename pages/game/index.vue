<template>
  <div class="grid grid-cols-3 gap-10 items-start max-w-[850px] mx-auto">
    <game-header-data :current-game="currentGame" :started="gameHaveStarted" />
    <game-multiple-choice v-if="gameHaveStarted" />
    <game-status-card
      v-else-if="gameSuccess || gameFailed"
      :current-game="currentGame"
      :is-success="gameSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount } from "vue";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { useCurrentGame } from "~/store/currentGame";

const storeCurrentGame = useCurrentGame();

const { currentGame } = storeToRefs(storeCurrentGame);

const gameHaveStarted = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Started;
});

const gameSuccess = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Done;
});

const gameFailed = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Failed;
});

onBeforeUnmount(() => {
  storeCurrentGame.resetQuiz();
});
</script>
