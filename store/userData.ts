import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { User } from "../interfaces/User";
import { QuizCategory } from "../interfaces/QuizCategory";
import { useFriends } from "./friends";
import { useUsers } from "./users";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { UserDefault } from "~/interfaces/UserDefault";

const regexValidation = /^[a-zA-Z0-9@_!]{3,10}$/;

export const useUserDataStore = defineStore("userData", () => {
  const friendsStore = useFriends();
  const usersStore = useUsers();

  const data = reactive<User>({
    userName: "user1838",
    avatarUrl: "av-7",
    level: 1,
    currentXp: 5,
    trophiesCount: 2,
    coinsCount: 216,
    isLogged: false,
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

  const friendsCount = computed<number>(() => {
    return friendsStore.friends.length;
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

  function usernameAlreadyExists(username: string): boolean {
    return usersStore.users.some(
      (user: UserDefault) => user.userName === username.toLowerCase()
    );
  }

  function validateUsername(username: string): boolean {
    const validUsername = regexValidation.test(username);
    return validUsername && !usernameAlreadyExists(username);
  }

  function login(userName: string): any {
    const usernameIsValid = validateUsername(userName);
    if (usernameIsValid) {
      data.userName = userName.toLowerCase();
      data.isLogged = true;
      return {
        isValid: true,
        messageError: null,
      };
    }
    return {
      isValid: false,
      messageError: usernameAlreadyExists(userName)
        ? "Nome de usuário já cadastrado!"
        : "Nome de usuário inválido!",
    };
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
    friendsCount,
  };
});
