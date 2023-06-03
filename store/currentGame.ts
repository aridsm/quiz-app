import { defineStore, storeToRefs } from "pinia";
import { reactive } from "vue";
import { useGameSettings } from "./gameSettings";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { QuizType } from "~/enums/quizType";
import mountBrazilQuiz from "~/utilities/mountBrazilQuiz";

export const useCurrentGame = defineStore("useCurrentGame", () => {
  const currentGame = reactive<CurrentGame>({
    title: "",
    totalQuestions: 0,
    correctAnswers: 0,
    lives: 3,
    xpGained: 0,
    coinsGained: 0,
    quizId: undefined,
    questions: [],
    geoQuizType: null,
    answerMode: null,
  });

  const storeGameSettings = useGameSettings();
  const { gameSettings } = storeToRefs(storeGameSettings);

  function createNewGame() {}

  function mountQuiz() {
    currentGame.title = gameSettings.value.quizName;
    currentGame.totalQuestions = gameSettings.value.numberOfQuestions;
    currentGame.quizId = gameSettings.value.quizId;
    currentGame.geoQuizType = gameSettings.value.geoQuizType;
    currentGame.answerMode = gameSettings.value.answerMode;

    if (
      currentGame.quizId === QuizType.BrazilStatesCapital ||
      currentGame.quizId === QuizType.BrazilStatesFlag
    ) {
      currentGame.questions = mountBrazilQuiz(currentGame);
      console.log(currentGame.questions);
    }
  }
  return { currentGame, createNewGame, mountQuiz };
});
