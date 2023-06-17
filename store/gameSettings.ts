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
    gameSettings.value.category = quiz.category;
    gameSettings.value.quizId = quiz.id;
    gameSettings.value.quizName = quiz.name;
    gameSettings.value.acceptAnswerMode = quiz.acceptAnswerMode;
    gameSettings.value.geoQuizType =
      quiz.category === QuizCategoryType.Geography
        ? GeoQuizType.FromFlagCapital
        : null;
    storeModals.modals.modalGameSettingsIsOpen = true;
  }

  return { gameSettings, openModalGameSettings };
});
