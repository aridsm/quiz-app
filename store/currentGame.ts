import { defineStore, storeToRefs } from "pinia";
import { computed, reactive } from "vue";
import { distance } from "fastest-levenshtein";
import { useGameSettings } from "./gameSettings";
import { useUserDataStore } from "./userData";
import { useLastGamesPlayed } from "./lastGamesPlayed";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { QuizType } from "~/enums/quizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import mountGeoQuiz from "~/utilities/mountGeoQuiz/mountGeoQuiz";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { AnswerMode } from "~/enums/answerMode";
import { TotalQuestions } from "~/enums/totalQuestions";
import { AnswerSimilarity } from "~/enums/answerSimilarity";

export const useCurrentGame = defineStore("useCurrentGame", () => {
  const currentGame = reactive<CurrentGame>({
    title: "",
    totalQuestions: TotalQuestions.Five,
    correctAnswers: 0,
    lives: 3,
    xpGained: 0,
    coinsGained: 0,
    quizId: undefined,
    questions: [],
    geoQuizType: null,
    answerMode: null,
    category: null,
    currentQuestionIndex: 0,
    status: CurrentGameStatus.NotStarted,
    answerSimilarity: AnswerSimilarity.NotValidated,
    stars: 0,
    infiniteMode: false,
  });

  const storeGameSettings = useGameSettings();
  const { gameSettings } = storeToRefs(storeGameSettings);

  const storeLastGamesPlay = useLastGamesPlayed();
  const storeUserData = useUserDataStore();

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
    currentGame.infiniteMode = gameSettings.value.infiniteMode;

    mountQuiz();

    currentGame.status = CurrentGameStatus.Started;
  }

  function mountQuiz() {
    if (gameSettings.value.category === QuizCategoryType.Geography) {
      currentGame.questions = mountGeoQuiz();
    }
  }

  function normalizeString(string: any) {
    return String(string)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036F]/g, "");
  }

  function validateInputValue(answer: string) {
    const correctAnswer = normalizeString(
      currentGame.questions[currentGame.currentQuestionIndex].correctAnswer
    );

    const enteredAnswer = normalizeString(answer);

    const levenshteinDistance = distance(enteredAnswer, correctAnswer);

    if (levenshteinDistance === 0) {
      currentGame.answerSimilarity = AnswerSimilarity.Equal;
    } else if (levenshteinDistance > 0 && levenshteinDistance <= 4) {
      return (currentGame.answerSimilarity = AnswerSimilarity.Similar);
    } else {
      currentGame.answerSimilarity = AnswerSimilarity.NotSimilar;
    }
  }

  function validateMultipleChoice(answer: string) {
    const answerIsCorrect =
      currentGame.questions[currentGame.currentQuestionIndex].correctAnswer ===
      answer;

    if (answerIsCorrect) {
      currentGame.answerSimilarity = AnswerSimilarity.Equal;
    } else {
      currentGame.answerSimilarity = AnswerSimilarity.NotSimilar;
    }
  }

  function denyAnswer() {
    --currentGame.lives;
    if (!currentGame.lives) {
      currentGame.status = CurrentGameStatus.Failed;
      storeLastGamesPlay.addGameToHistory(currentGame);
    }
  }

  function finishQuizSuccess() {
    currentGame.status = CurrentGameStatus.Done;
    storeLastGamesPlay.addGameToHistory(currentGame);

    const percentageCorrectAnswers =
      (currentGame.correctAnswers * 100) / currentGame.totalQuestions;

    if (percentageCorrectAnswers === 100) {
      currentGame.stars = 3;
    } else if (percentageCorrectAnswers >= 60) {
      currentGame.stars = 2;
    } else if (percentageCorrectAnswers >= 40) {
      currentGame.stars = 1;
    } else {
      currentGame.stars = 0;
    }

    sendRewardsToUser();
  }

  function sendRewardsToUser() {
    storeUserData.getRewards(currentGame);
  }

  function confirmAnswer() {
    const answerIsCorrect = (currentGame.answerSimilarity =
      AnswerSimilarity.Equal);

    if (answerIsCorrect) {
      acceptAnswer();
    } else {
      denyAnswer();
    }

    nextQuestion();
  }

  function nextQuestion() {
    if (currentGame.currentQuestionIndex + 1 === currentGame.totalQuestions) {
      return finishQuizSuccess();
    }

    currentGame.answerSimilarity = AnswerSimilarity.NotValidated;
    ++currentGame.currentQuestionIndex;
  }

  function skipQuestion() {
    denyAnswer();
    nextQuestion();
  }

  function acceptAnswer() {
    currentGame.xpGained += currentGame.currentQuestionIndex + 1;
    ++currentGame.correctAnswers;
  }

  function validateAnswer(answer: string) {
    if (currentGame.answerMode === AnswerMode.WriteAnswer) {
      validateInputValue(answer);
    }

    if (currentGame.answerMode === AnswerMode.MultipleChoice) {
      validateMultipleChoice(answer);
    }
  }

  function resetQuiz() {
    currentGame.title = "";
    currentGame.totalQuestions = TotalQuestions.Five;
    currentGame.correctAnswers = 0;
    currentGame.lives = 3;
    currentGame.xpGained = 0;
    currentGame.coinsGained = 0;
    currentGame.quizId = undefined;
    currentGame.questions = [];
    currentGame.geoQuizType = null;
    currentGame.answerMode = null;
    currentGame.category = null;
    currentGame.currentQuestionIndex = 0;
    currentGame.status = CurrentGameStatus.NotStarted;
    currentGame.stars = 0;
    currentGame.infiniteMode = false;
    currentGame.answerSimilarity = AnswerSimilarity.NotValidated;
  }

  return {
    currentGame,
    createNewGame,
    isFlag,
    isCapital,
    isCountry,
    isBrazilStates,
    validateAnswer,
    resetQuiz,
    acceptAnswer,
    confirmAnswer,
    skipQuestion,
  };
});
