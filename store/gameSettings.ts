import { defineStore } from "pinia";
import { ref } from "vue";
import { useModals } from "./modals";
import { AnswerMode } from "~/enums/answerMode";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { GameSetting } from "~/interfaces/GameSetting";
import { Quiz } from "~/interfaces/Quiz";

export const useGameSettings = defineStore("useGameSettings", () => {
  const gameSettings = ref<GameSetting>({
    quizId: undefined,
    quizName: "",
    category: null,
    answerMode: AnswerMode.MultipleChoice,
    numberOfQuestions: 5,
    acceptAnswerMode: true,
    geoQuizType: null,
  });

  const storeModals = useModals();

  function openModalGameSettings(quiz: Quiz) {
    gameSettings.value.quizId = quiz.id;
    gameSettings.value.quizName = quiz.name;
    gameSettings.value.category = quiz.category;
    gameSettings.value.answerMode = AnswerMode.MultipleChoice;
    gameSettings.value.numberOfQuestions = 5;
    gameSettings.value.acceptAnswerMode = quiz.acceptAnswerMode;
    gameSettings.value.geoQuizType =
      quiz.category === QuizCategoryType.Geography
        ? GeoQuizType.FromFlagCapital
        : null;
    storeModals.modals.modalGameSettingsIsOpen = true;
  }

  function resetGameSettings() {
    gameSettings.value.quizId = undefined;
    gameSettings.value.quizName = "";
    gameSettings.value.category = null;
    gameSettings.value.answerMode = AnswerMode.MultipleChoice;
    gameSettings.value.numberOfQuestions = 5;
    gameSettings.value.acceptAnswerMode = true;
    gameSettings.value.geoQuizType = null;
  }

  return { gameSettings, openModalGameSettings, resetGameSettings };
});
