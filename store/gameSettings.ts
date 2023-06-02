import { defineStore } from "pinia";
import { ref } from "vue";
import { AnswerMode } from "~/enums/answerMode";
import { GameSetting } from "~/interfaces/GameSetting";

export const useGameSettings = defineStore("useGameSettings", () => {
  const gameSettings = ref<GameSetting>({
    quizName: "",
    category: null,
    answerMode: AnswerMode.MultipleChoice,
    numberOfQuestions: 5,
    quizType: undefined,
    isCountry: undefined,
    geoQuizType: undefined,
    acceptAnswerMode: true,
    countdown: false,
  });

  return { gameSettings };
});
