import { defineStore } from "pinia";
import { ref } from "vue";
import { AnswerMode } from "~/enums/answerMode";
import { GameSetting } from "~/interfaces/GameSetting";

export const useGameSettings = defineStore("useGameSettings", () => {
  const gameSettings = ref<GameSetting>({
    quizId: undefined,
    quizName: "",
    category: null,
    answerMode: AnswerMode.MultipleChoice,
    numberOfQuestions: 5,
    acceptAnswerMode: true,
    geoQuizType: null,
    infiniteMode: false,
  });

  return { gameSettings };
});
