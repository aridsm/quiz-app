import { defineStore } from "pinia";
import { ref } from "vue";
import { GameStatus } from "~/enums/gameStatus";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { GamePlayed } from "~/interfaces/GamePlayed";

export const useLastGamesPlayed = defineStore("useLastGamesPlayed", () => {
  const lastGamesPlayed = ref<GamePlayed[]>([
    {
      name: "Bandeira de Países",
      status: GameStatus.Win,
      totalQuestions: 5,
      correctQuestions: 5,
      earnedCoinds: 3,
      earnedXp: 5,
      category: QuizCategoryType.Geography,
      id: 1,
    },
    {
      name: "Anatomia Humana",
      status: GameStatus.Fail,
      totalQuestions: 20,
      correctQuestions: 6,
      earnedCoinds: 3,
      earnedXp: 6,
      category: QuizCategoryType.Biology,
      id: 2,
    },
    {
      name: "Raízes e Potências",
      status: GameStatus.Win,
      totalQuestions: 14,
      correctQuestions: 15,
      earnedCoinds: 14,
      earnedXp: 8,
      category: QuizCategoryType.Mathematics,
      id: 3,
    },
    {
      name: "Bandeiras de Estados do Brasil",
      status: GameStatus.Fail,
      totalQuestions: 1,
      correctQuestions: 5,
      earnedCoinds: 1,
      earnedXp: 1,
      category: QuizCategoryType.Geography,
      id: 4,
    },
    {
      name: "Bandeiras de Estados do Brasil",
      status: GameStatus.Win,
      totalQuestions: 5,
      correctQuestions: 5,
      earnedCoinds: 5,
      earnedXp: 5,
      category: QuizCategoryType.Geography,
      id: 5,
    },
  ]);

  return { lastGamesPlayed };
});
