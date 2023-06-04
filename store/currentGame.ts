import { defineStore, storeToRefs } from "pinia";
import { computed, reactive } from "vue";
import { useGameSettings } from "./gameSettings";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { QuizType } from "~/enums/quizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import useMountQuiz from "~/utilities/mountGeoQuiz/mountCountryQuiz";

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
    category: null,
  });

  const storeGameSettings = useGameSettings();
  const { gameSettings } = storeToRefs(storeGameSettings);

  const isFlag = computed(() => {
    return (
      currentGame.quizId === QuizType.CountryFlag ||
      currentGame.quizId === QuizType.BrazilStatesFlag
    );
  });

  const isCapital = computed(() => {
    return (
      currentGame.quizId === QuizType.CountryCapital ||
      currentGame.quizId === QuizType.BrazilStatesCapital
    );
  });

  const isCountry = computed(() => {
    return (
      currentGame.quizId === QuizType.CountryFlag ||
      currentGame.quizId === QuizType.CountryCapital
    );
  });

  const isBrazilStates = computed(() => {
    return (
      currentGame.quizId === QuizType.BrazilStatesFlag ||
      currentGame.quizId === QuizType.BrazilStatesCapital
    );
  });

  function createNewGame() {
    currentGame.title = gameSettings.value.quizName;
    currentGame.totalQuestions = gameSettings.value.numberOfQuestions;
    currentGame.quizId = gameSettings.value.quizId;
    currentGame.geoQuizType = gameSettings.value.geoQuizType;
    currentGame.answerMode = gameSettings.value.answerMode;
    currentGame.category = gameSettings.value.category;

    mountQuiz();
  }

  function mountQuiz() {
    if (gameSettings.value.category === QuizCategoryType.Geography) {
      currentGame.questions = useMountQuiz();
    }
  }
  return {
    currentGame,
    createNewGame,
    isFlag,
    isCapital,
    isCountry,
    isBrazilStates,
  };
});
