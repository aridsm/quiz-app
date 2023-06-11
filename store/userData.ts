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
    userName: "",
    avatarUrl: "",
    level: 1,
    levelProgress: 20,
    currentXp: 0,
    trophiesCount: 2,
    coinsCount: 216,
    isLogged: false,
    soundOn: true,
    soundVolume: 80,
    friendsCount: friendsStore.friends.length,
    hasNotifications: false,
    totalGamesPlayed: 4,
    categoriesPlayed: [
      {
        id: QuizCategoryType.Biology,
        count: 1,
        name: "biologia",
      },
      {
        id: QuizCategoryType.Geography,
        count: 2,
        name: "geografia",
      },
      {
        id: QuizCategoryType.Mathematics,
        count: 2,
        name: "matemática",
      },
    ],
    lastGamesPlayed: [],
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

  function getRewards(currentGame: CurrentGame) {
    data.currentXp += currentGame.xpGained;
    data.coinsCount += currentGame.coinsGained;
  }

  return { data, login, mostPlayedCategories, getRewards };
});
