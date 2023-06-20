<template>
  <div
    class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 items-start max-w-[850px] mx-auto"
  >
    <game-header-data :current-game="currentGame" :started="gameHaveStarted" />
    <game-choices-card v-if="gameHaveStarted" />
    <game-status-card
      v-else-if="gameSuccess || gameFailed"
      :current-game="currentGame"
      :is-success="gameSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "@nuxtjs/composition-api";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, onMounted } from "vue";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { useCurrentGame } from "~/store/currentGame";

const storeCurrentGame = useCurrentGame();

const { currentGame } = storeToRefs(storeCurrentGame);
const router = useRouter();

const gameHaveStarted = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Started;
});

const gameSuccess = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Done;
});

const gameFailed = computed<boolean>(() => {
  return currentGame.value.status === CurrentGameStatus.Failed;
});

onMounted(() => {
  const gameNotStarted =
    currentGame.value.status === CurrentGameStatus.NotStarted;

  if (gameNotStarted) {
    router.push("/");
  }
});

onBeforeUnmount(() => {
  storeCurrentGame.resetQuiz();
});
</script>
