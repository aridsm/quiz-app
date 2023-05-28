import { defineStore } from "pinia";
import { ref } from "vue";
import { Friend } from "~/interfaces/Friend";

export const useFriends = defineStore("useFriends", () => {
  const friends = ref<Friend[]>([
    {
      userName: "ann@539",
      avatarUrl: "av-3",
      lastMessage: "",
      id: 1,
    },
    {
      userName: "pedro_91",
      avatarUrl: "av-8",
      lastMessage: "",
      id: 2,
    },
    {
      userName: "jul!_ana",
      avatarUrl: "av-5",
      lastMessage: "",
      id: 3,
    },
  ]);

  function addNewFriend() {}

  return { friends };
});
