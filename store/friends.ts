import { defineStore, storeToRefs } from "pinia";
import { computed } from "vue";
import { useUsers } from "./users";
import { UserDefault } from "~/interfaces/UserDefault";

export const useFriends = defineStore("useFriends", () => {
  const usersStore = useUsers();
  const { users } = storeToRefs(usersStore);

  const friends = computed<UserDefault[]>(() => {
    return users.value.filter((user: UserDefault) => user.isFriend);
  });

  function addNewFriend() {}

  function deleteFriend(id: number) {
    const index = users.value.findIndex((user: UserDefault) => user.id === id);
    users.value[index].isFriend = false;
  }

  function searchFriend(name: string) {
    const searchValue = name.trim().toLowerCase();

    const gamesFiltered = friends.value.filter((friend: UserDefault) =>
      friend.userName.toLowerCase().includes(searchValue)
    );

    return gamesFiltered;
  }

  return { friends, searchFriend, deleteFriend };
});
