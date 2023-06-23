import { defineStore } from "pinia";
import { computed, reactive, onMounted } from "vue";
import { User } from "../interfaces/User";
import { useFriends } from "./friends";
import { useNotifications } from "./notifications";
import { useLastGamesPlayed } from "./lastGamesPlayed";
import { useUsers } from "./users";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { UserDefault } from "~/interfaces/UserDefault";
import getLocalStorageItem from "~/utilities/getLocalStorageItem";
import normalizeString from "~/utilities/normalizeString";

const regexValidation = /^[a-zA-Z0-9@_!]{3,10}$/;

export const useUserDataStore = defineStore("userData", () => {
  const friendsStore = useFriends();
  const usersStore = useUsers();
  const notifications = useNotifications();
  const lastGamesPlayed = useLastGamesPlayed();

  const data = reactive<User>({
    userName: "",
    avatarUrl: "av-7",
    level: 1,
    currentXp: 0,
    trophiesCount: 0,
    coinsCount: 10,
    isLogged: false,
  });

  onMounted(async () => {
    const user = await getLocalStorageItem("quizUserData");
    if (user) {
      data.userName = user.userName;
      data.avatarUrl = user.avatarUrl;
      data.level = user.level;
      data.currentXp = user.currentXp;
      data.trophiesCount = user.trophiesCount;
      data.coinsCount = user.coinsCount;
      data.isLogged = user.isLogged;
    }
  });

  const friendsCount = computed<number>(() => {
    return friendsStore.friends.length;
  });

  const totalXpInCurrentLevel = computed<number>(() => {
    const totalXp = 10 + data.level * 2;
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
      data.userName = normalizeString(userName);
      data.isLogged = true;
      saveToLocalStorage();
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

  function calculateXpGained(xpGained: number) {
    const newXpAdded = data.currentXp + xpGained;
    if (newXpAdded >= totalXpInCurrentLevel.value) {
      data.currentXp -= totalXpInCurrentLevel.value;
      ++data.level;
      calculateXpGained(xpGained);
    } else {
      data.currentXp += xpGained;
    }
  }

  function getRewards(currentGame: CurrentGame) {
    data.coinsCount += currentGame.coinsGained;

    calculateXpGained(currentGame.xpGained);

    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    const userData = JSON.stringify(data);
    window.localStorage.setItem("quizUserData", userData);
  }

  function logout() {
    data.isLogged = false;
    window.localStorage.removeItem("quizUserData");
    window.localStorage.removeItem("gamesPlayed");
    window.localStorage.removeItem("notificationsQuiz");
    window.localStorage.removeItem("usersList");
    usersStore.users[3].isFriend = false;
    resetUserData();
    notifications.resetNotifications();
    lastGamesPlayed.resetLastGamesPlayed();
  }

  function resetUserData() {
    data.userName = "";
    data.avatarUrl = "av-7";
    data.level = 1;
    data.currentXp = 0;
    data.trophiesCount = 0;
    data.coinsCount = 10;
    data.isLogged = false;
  }

  function changeAvatar(avatar: string) {
    data.avatarUrl = avatar;
    saveToLocalStorage();
  }

  return {
    data,
    login,
    getRewards,
    totalXpInCurrentLevel,
    friendsCount,
    logout,
    changeAvatar,
  };
});
