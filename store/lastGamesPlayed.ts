import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { CurrentGameStatus } from "~/enums/currentGameStatus";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { GamePlayed } from "~/interfaces/GamePlayed";
import { QuizCategory } from "~/interfaces/QuizCategory";
import getLocalStorageItem from "~/utilities/getLocalStorageItem";
import normalizeString from "~/utilities/normalizeString";

const defaultData = [
  {
    name: "Bandeiras de Países",
    status: CurrentGameStatus.Done,
    totalQuestions: 5,
    correctQuestions: 5,
    earnedCoins: 1,
    earnedXp: 5,
    category: QuizCategoryType.Geography,
    id: 1,
  },
  {
    name: "O corpo humano",
    status: CurrentGameStatus.Failed,
    totalQuestions: 20,
    correctQuestions: 6,
    earnedCoins: 2,
    earnedXp: 20,
    category: QuizCategoryType.Biology,
    id: 2,
  },
  {
    name: "Raízes e Potências",
    status: CurrentGameStatus.Done,
    totalQuestions: 15,
    correctQuestions: 14,
    earnedCoins: 4,
    earnedXp: 15,
    category: QuizCategoryType.Mathematics,
    id: 3,
  },
  {
    name: "Reino Animal",
    status: CurrentGameStatus.Done,
    totalQuestions: 14,
    correctQuestions: 15,
    earnedCoins: 5,
    earnedXp: 14,
    category: QuizCategoryType.Biology,
    id: 4,
  },
];

export const useLastGamesPlayed = defineStore("useLastGamesPlayed", () => {
  const lastGamesPlayed = ref<GamePlayed[]>([...defaultData]);

  onMounted(async () => {
    const gamesStored = await getLocalStorageItem("gamesPlayed");
    if (gamesStored) {
      lastGamesPlayed.value = gamesStored;
    }
  });

  const categoriesPlayed = computed<QuizCategory[]>(() => {
    const categories = [
      {
        id: QuizCategoryType.Biology,
        count: 0,
        victories: 0,
        name: "biologia",
      },
      {
        id: QuizCategoryType.Geography,
        count: 0,
        victories: 0,
        name: "geografia",
      },
      {
        id: QuizCategoryType.Mathematics,
        count: 0,
        victories: 0,
        name: "matemática",
      },
    ];

    lastGamesPlayed.value.forEach((game: GamePlayed) => {
      const index = game.category - 1;
      ++categories[index].count;
      if (game.status === CurrentGameStatus.Done) {
        ++categories[index].victories;
      }
    });

    return categories;
  });

  const totalGamesPlayed = computed<number>(() => {
    const total = categoriesPlayed.value.reduce(
      (acc, currentValue) => acc + currentValue.count,
      0
    );

    return total;
  });

  const totalVictories = computed<number>(() => {
    const total = categoriesPlayed.value.reduce(
      (acc, currentValue) => acc + currentValue.victories,
      0
    );

    return total;
  });

  const mostPlayedCategories = computed<QuizCategory[]>(() => {
    const categoriesCounts: number[] = categoriesPlayed.value.map(
      (category: QuizCategory) => category.count
    );

    const maxValue = Math.max(...categoriesCounts);

    const categories: QuizCategory[] = categoriesPlayed.value.filter(
      (category: QuizCategory) => category.count === maxValue
    );

    return categories;
  });

  function addGameToHistory(game: CurrentGame) {
    const body = {
      name: game.title,
      status: game.status,
      totalQuestions: game.totalQuestions,
      correctQuestions: game.correctAnswers,
      earnedCoins: game.coinsGained,
      earnedXp: game.xpGained,
      category: game.category as QuizCategoryType,
      id: new Date().getTime(),
    };
    lastGamesPlayed.value.unshift(body);

    const gamesPlayedJSON = JSON.stringify(lastGamesPlayed.value);
    window.localStorage.setItem("gamesPlayed", gamesPlayedJSON);
  }

  function searchGame(name: string) {
    const searchValue = normalizeString(name);

    const gamesFiltered = lastGamesPlayed.value.filter((game: GamePlayed) =>
      normalizeString(game.name).includes(searchValue)
    );

    return gamesFiltered;
  }

  function resetLastGamesPlayed() {
    lastGamesPlayed.value = defaultData;
  }

  return {
    lastGamesPlayed,
    addGameToHistory,
    searchGame,
    categoriesPlayed,
    totalGamesPlayed,
    totalVictories,
    mostPlayedCategories,
    resetLastGamesPlayed,
  };
});
