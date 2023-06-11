import { defineStore, storeToRefs } from "pinia";
import { computed, reactive } from "vue";
import { distance } from "fastest-levenshtein";
import { useGameSettings } from "./gameSettings";
import { useUserDataStore } from "./userData";
import { useLastGamesPlayed } from "./lastGamesPlayed";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { QuizType } from "~/enums/quizType";
import mountQuiz from "~/utilities/mountQuiz";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { AnswerMode } from "~/enums/answerMode";
import { AnswerSimilarity } from "~/enums/answerSimilarity";

const defaultData = {
  title: "",
  totalQuestions: 5,
  correctAnswers: 0,
  totalLives: 3,
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
  skipChances: 0,
};

export const useCurrentGame = defineStore("useCurrentGame", () => {
  const currentGame = reactive<CurrentGame>({ ...defaultData });

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
    currentGame.quizId = gameSettings.value.quizId;
    currentGame.geoQuizType = gameSettings.value.geoQuizType;
    currentGame.answerMode = gameSettings.value.answerMode;
    currentGame.category = gameSettings.value.category;
    currentGame.totalQuestions = gameSettings.value.numberOfQuestions;

    if (gameSettings.value.numberOfQuestions) {
      currentGame.skipChances = (+gameSettings.value.numberOfQuestions - 5) / 5;
      currentGame.totalLives =
        2 + (+gameSettings.value.numberOfQuestions - 5) / 5;
      currentGame.lives = currentGame.totalLives;
    }

    currentGame.questions = mountQuiz();
    currentGame.status = CurrentGameStatus.Started;
  }

  function normalizeString(string: any) {
    return String(string)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036F]/g, "");
  }

  function validateInputValue(answer: string) {
    const enteredAnswer = normalizeString(answer);
    const correctAnswer =
      currentGame.questions[currentGame.currentQuestionIndex].correctAnswer;

    let levenshteinDistance: number = 0;
    let percentageSimilarity: number = 0;

    if (typeof correctAnswer === "object" && correctAnswer.length > 1) {
      const levenshteinForCorrectAnswer: any[] = correctAnswer.map(
        (correct: string) => ({
          levenshtein: distance(enteredAnswer, normalizeString(correct)),
          answer: normalizeString(correct),
        })
      );
      const levenshteinDistances = levenshteinForCorrectAnswer.map(
        (lev: any) => lev.levenshtein
      );

      levenshteinDistance = Math.min(...levenshteinDistances);

      const mostSimilarCorrectAnswer = levenshteinForCorrectAnswer.find(
        (ans: any) => ans.levenshtein === levenshteinDistance
      );

      percentageSimilarity =
        (levenshteinDistance * 100) /
        normalizeString(mostSimilarCorrectAnswer).length;
    } else {
      const correctAnswerNormalized = normalizeString(correctAnswer);
      levenshteinDistance = distance(enteredAnswer, correctAnswerNormalized);

      percentageSimilarity =
        (levenshteinDistance * 100) / correctAnswerNormalized.length;
    }

    if (levenshteinDistance === 0) {
      currentGame.answerSimilarity = AnswerSimilarity.Equal;
      acceptAnswer();
    } else if (percentageSimilarity > 0 && percentageSimilarity <= 35) {
      return (currentGame.answerSimilarity = AnswerSimilarity.Similar);
    } else {
      currentGame.answerSimilarity = AnswerSimilarity.NotSimilar;
      denyAnswer();
    }
  }

  function validateMultipleChoice(answer: string) {
    const answerIsCorrect =
      currentGame.questions[currentGame.currentQuestionIndex].correctAnswer ===
      answer;

    if (answerIsCorrect) {
      currentGame.answerSimilarity = AnswerSimilarity.Equal;
      acceptAnswer();
    } else {
      currentGame.answerSimilarity = AnswerSimilarity.NotSimilar;
      denyAnswer();
    }
  }

  function denyAnswer() {
    --currentGame.lives;
  }

  function finishQuizSuccess() {
    currentGame.status = CurrentGameStatus.Done;
    storeLastGamesPlay.addGameToHistory(currentGame);

    const percentageCorrectAnswers =
      (currentGame.correctAnswers * 100) / currentGame.totalQuestions!;

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

  function nextQuestion() {
    if (!currentGame.lives) {
      currentGame.status = CurrentGameStatus.Failed;
      storeLastGamesPlay.addGameToHistory(currentGame);
    }

    if (currentGame.currentQuestionIndex + 1 === currentGame.totalQuestions) {
      return finishQuizSuccess();
    }

    currentGame.answerSimilarity = AnswerSimilarity.NotValidated;
    ++currentGame.currentQuestionIndex;
  }

  function acceptAnswer() {
    currentGame.xpGained += 1;
    ++currentGame.correctAnswers;
    currentGame.coinsGained = Math.floor(currentGame.correctAnswers / 3);
  }

  function validateAnswer(answer: string) {
    if (currentGame.answerMode === AnswerMode.WriteAnswer) {
      validateInputValue(answer);
    }

    if (currentGame.answerMode === AnswerMode.MultipleChoice) {
      validateMultipleChoice(answer);
    }
  }

  function skipQuestion() {
    --currentGame.skipChances;
    nextQuestion();
  }

  function resetQuiz() {
    currentGame.title = defaultData.title;
    currentGame.totalQuestions = defaultData.totalQuestions;
    currentGame.correctAnswers = defaultData.correctAnswers;
    currentGame.totalLives = defaultData.totalLives;
    currentGame.lives = defaultData.lives;
    currentGame.xpGained = defaultData.xpGained;
    currentGame.coinsGained = defaultData.coinsGained;
    currentGame.quizId = defaultData.quizId;
    currentGame.questions = defaultData.questions;
    currentGame.geoQuizType = defaultData.geoQuizType;
    currentGame.answerMode = defaultData.answerMode;
    currentGame.category = defaultData.category;
    currentGame.currentQuestionIndex = defaultData.currentQuestionIndex;
    currentGame.status = defaultData.status;
    currentGame.answerSimilarity = defaultData.answerSimilarity;
    currentGame.stars = defaultData.stars;
    currentGame.skipChances = defaultData.skipChances;
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
    nextQuestion,
    skipQuestion,
  };
});
