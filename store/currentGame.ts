import { defineStore, storeToRefs } from "pinia";
import { reactive } from "vue";
import { useGameSettings } from "./gameSettings";
import { CurrentGame } from "~/interfaces/CurrentGame";

export const useCurrentGame = defineStore("useCurrentGame", () => {
  const currentGame = reactive<CurrentGame>({
    title: "",
    totalQuestions: 0,
    correctAnswers: 0,
    lives: 3,
    xpGained: 0,
    coinsGained: 0,
    questions: [],
  });

  const storeGameSettings = useGameSettings();
  const { gameSettings } = storeToRefs(storeGameSettings);

  function createNewGame() {}

  function mountQuiz() {
    currentGame.title = gameSettings.value.quizName;
    currentGame.totalQuestions = gameSettings.value.numberOfQuestions;
  }

  return { currentGame, createNewGame, mountQuiz };
});
