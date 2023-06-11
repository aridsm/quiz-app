import { defineStore } from "pinia";
import { ref } from "vue";
import { Friend } from "~/interfaces/Friend";

export const useFriends = defineStore("useFriends", () => {
  const friends = ref<Friend[]>([
    {
      userName: "ann@539",
      avatarUrl: "av-3",
      lastMessage: "",
      isOnline: true,
      id: 1,
    },
    {
      userName: "pedro_91",
      avatarUrl: "av-8",
      lastMessage: "",
      isOnline: true,
      id: 2,
    },
    {
      userName: "jul!_ana",
      avatarUrl: "av-1",
      lastMessage: "",
      isOnline: false,
      id: 3,
    },
    {
      userName: "xdaanny",
      avatarUrl: "av-9",
      lastMessage: "",
      isOnline: true,
      id: 4,
    },
  ]);

  function addNewFriend() {}

  return { friends };
});
