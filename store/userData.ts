import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { User } from "../interfaces/User";
import { useFriends } from "./friends";
import { useUsers } from "./users";
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
  });

  const friendsCount = computed<number>(() => {
    return friendsStore.friends.length;
  });

  const totalXpInCurrentLevel = computed<number>(() => {
    const totalXp = 25 + data.level;
    return totalXp;
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
    getRewards,
    totalXpInCurrentLevel,
    friendsCount,
  };
});
