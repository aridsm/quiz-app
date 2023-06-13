import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { User } from "../interfaces/User";
import { QuizCategory } from "../interfaces/QuizCategory";
import { useFriends } from "./friends";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { CurrentGame } from "~/interfaces/CurrentGame";

const regexValidation = /^[a-zA-Z0-9@_!]{3,10}$/;

export const useUserDataStore = defineStore("userData", () => {
  const friendsStore = useFriends();

  const data = reactive<User>({
    userName: "user1838",
    avatarUrl: "av-7",
    level: 1,
    currentXp: 5,
    trophiesCount: 2,
    coinsCount: 216,
    isLogged: false,
    friendsCount: friendsStore.friends.length,
    hasNotifications: false,
    categoriesPlayed: [
      {
        id: QuizCategoryType.Biology,
        count: 1,
        victories: 1,
        name: "biologia",
      },
      {
        id: QuizCategoryType.Geography,
        count: 2,
        victories: 1,
        name: "geografia",
      },
      {
        id: QuizCategoryType.Mathematics,
        count: 2,
        victories: 2,
        name: "matemática",
      },
    ],
  });

  const totalGamesPlayed = computed<number>(() => {
    const total = data.categoriesPlayed.reduce(
      (acc, currentValue) => acc + currentValue.count,
      0
    );

    return total;
  });

  const totalXpInCurrentLevel = computed<number>(() => {
    const totalXp = 25 + data.level;
    return totalXp;
  });

  const totalVictories = computed<number>(() => {
    const total = data.categoriesPlayed.reduce(
      (acc, currentValue) => acc + currentValue.victories,
      0
    );

    return total;
  });

  const mostPlayedCategories = computed<QuizCategory[]>(() => {
    const categoriesCounts: number[] = data.categoriesPlayed.map(
      (category: QuizCategory) => category.count
    );

    const maxValue = Math.max(...categoriesCounts);

    const categories: QuizCategory[] = data.categoriesPlayed.filter(
      (category: QuizCategory) => category.count === maxValue
    );

    return categories;
  });

  function login(userName: string): boolean {
    const usernameIsValid = regexValidation.test(userName);
    if (usernameIsValid) {
      data.userName = userName.toLowerCase();
      data.isLogged = true;
      return true;
    }
    return false;
  }

  function calculateXpGained() {
    if (data.currentXp > totalXpInCurrentLevel.value) {
      ++data.level;
      data.currentXp -= totalXpInCurrentLevel.value;
      calculateXpGained();
    }
  }

  function getRewards(currentGame: CurrentGame) {
    data.coinsCount += currentGame.coinsGained;

    data.currentXp += currentGame.xpGained;

    calculateXpGained();
  }

  return {
    data,
    login,
    mostPlayedCategories,
    totalGamesPlayed,
    totalVictories,
    getRewards,
    totalXpInCurrentLevel,
  };
});
