import { defineStore } from "pinia";
import { reactive } from "vue";
import { User } from "../interfaces/User";
import { useFriends } from "./friends";

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
    totalGamesPlayed: 3,
    categoriesPlayed: {
      geography: 1,
      mathematics: 1,
      biology: 1,
    },
    lastGamesPlayed: [],
  });

  function login(userName: string) {
    data.userName = userName;
    data.isLogged = true;
  }

  return { data, login };
});
