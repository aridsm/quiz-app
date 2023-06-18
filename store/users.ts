import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { UserDefault } from "~/interfaces/UserDefault";
import getLocalStorageItem from "~/utilities/getLocalStorageItem";

export const useUsers = defineStore("useUsers", () => {
  const users = ref<UserDefault[]>([
    {
      userName: "xdaanny",
      avatarUrl: "av-9",
      level: 39,
      score: 305,
      trophiesCount: 6,
      id: 1,
      isFriend: true,
      isOnline: true,
    },
    {
      userName: "olli3",
      avatarUrl: "av-2",
      level: 40,
      score: 325,
      trophiesCount: 5,
      id: 2,
      isFriend: false,
      isOnline: true,
    },
    {
      userName: "prijx",
      avatarUrl: "av-9",
      level: 40,
      score: 315,
      trophiesCount: 8,
      id: 3,
      isFriend: false,
      isOnline: false,
    },
    {
      userName: "gabe817",
      avatarUrl: "av-1",
      level: 16,
      score: 95,
      trophiesCount: 2,
      id: 4,
      isFriend: false,
      isOnline: false,
    },
    {
      userName: "pedro_91",
      avatarUrl: "av-3",
      level: 9,
      score: 105,
      trophiesCount: 1,
      id: 5,
      isFriend: true,
      isOnline: false,
    },
    {
      userName: "_@nn@_",
      avatarUrl: "av-4",
      level: 21,
      score: 95,
      trophiesCount: 2,
      id: 6,
      isFriend: true,
      isOnline: true,
    },
    {
      userName: "tay18",
      avatarUrl: "av-5",
      level: 32,
      score: 95,
      trophiesCount: 2,
      id: 7,
      isFriend: true,
      isOnline: true,
    },
  ]);

  onMounted(async () => {
    const usersList = await getLocalStorageItem("usersList");
    if (usersList) {
      users.value = usersList;
    }
  });

  const usersBiggestsScores = computed(() => {
    const usersCloned = JSON.parse(JSON.stringify(users.value));
    const usersSorted = [...usersCloned].sort((userA: any, userB: any) => {
      if (userA.score > userB.score) {
        return -1;
      } else if (userA.score < userB.score) {
        return 1;
      } else {
        return 0;
      }
    });
    return usersSorted;
  });

  return { users, usersBiggestsScores };
});
