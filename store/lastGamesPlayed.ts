import { defineStore } from "pinia";
import { ref } from "vue";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { GamePlayed } from "~/interfaces/GamePlayed";

export const useLastGamesPlayed = defineStore("useLastGamesPlayed", () => {
  const lastGamesPlayed = ref<GamePlayed[]>([
    {
      name: "Bandeira de Países",
      status: CurrentGameStatus.Done,
      totalQuestions: 5,
      correctQuestions: 5,
      earnedCoins: 3,
      earnedXp: 5,
      category: QuizCategoryType.Geography,
      id: 1,
    },
    {
      name: "Anatomia Humana",
      status: CurrentGameStatus.Failed,
      totalQuestions: 20,
      correctQuestions: 6,
      earnedCoins: 3,
      earnedXp: 6,
      category: QuizCategoryType.Biology,
      id: 2,
    },
    {
      name: "Raízes e Potências",
      status: CurrentGameStatus.Done,
      totalQuestions: 14,
      correctQuestions: 15,
      earnedCoins: 14,
      earnedXp: 8,
      category: QuizCategoryType.Mathematics,
      id: 3,
    },
    {
      name: "Bandeiras de Estados do Brasil",
      status: CurrentGameStatus.Failed,
      totalQuestions: 10,
      correctQuestions: 5,
      earnedCoins: 1,
      earnedXp: 1,
      category: QuizCategoryType.Geography,
      id: 4,
    },
    {
      name: "Bandeiras de Estados do Brasil",
      status: CurrentGameStatus.Done,
      totalQuestions: 5,
      correctQuestions: 5,
      earnedCoins: 5,
      earnedXp: 5,
      category: QuizCategoryType.Geography,
      id: 5,
    },
  ]);

  function addGameToHistory(game: CurrentGame) {
    const body = {
      name: game.title,
      status: game.status,
      totalQuestions: game.totalQuestions,
      correctQuestions: game.correctAnswers,
      earnedCoins: game.coinsGained,
      earnedXp: game.xpGained,
      category: game.category,
      id: new Date().getTime(),
    };
    lastGamesPlayed.value.unshift(body);
  }

  function searchGame(name: string) {
    const searchValue = name.trim().toLowerCase();

    const gamesFiltered = lastGamesPlayed.value.filter((game: GamePlayed) =>
      game.name.toLowerCase().includes(searchValue)
    );

    return gamesFiltered;
  }

  return { lastGamesPlayed, addGameToHistory, searchGame };
});
