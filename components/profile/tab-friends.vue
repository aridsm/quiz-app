<template>
  <div class="bg-quiz-grey-400 rounded-md">
    <div class="flex justify-between items-center px-3 sm:px-6 py-4">
      <p class="text-quiz-grey-100">Seus amigos</p>
      <quiz-input-text
        :model.sync="searchValue"
        placeholder="Procure por um amigo..."
        class="py-3 text-base w-44 sm:w-56"
        style="background: #1f202c"
        @input="onSearchHistory"
      />
    </div>

    <div class="py-4 px-3 sm:px-6 pt-0 sm:h-[20rem] overflow-auto list_friends">
      <ul class="flex flex-col gap-1 sm:gap-2">
        <li
          v-for="friend in friendsOnlineFirst"
          :key="friend.id"
          class="flex items-center p-3 sm:p-4 bg-quiz-grey-300 rounded-md"
        >
          <quiz-x-avatar :avatar="friend.avatarUrl" />
          <p class="w-auto ml-5">
            {{ friend.userName }}
          </p>
          <div
            v-if="friend.isOnline"
            class="w-2 h-2 bg-quiz-blue rounded-full ml-3"
          />
          <div class="ml-auto flex items-center gap-6 text-quiz-grey-100">
            <div v-title="'excluir amigo'" aria-label="Excluir amigo">
              <button
                class="hover:text-quiz-blue active:scale-95"
                @click="() => deleteFriendHandler(friend.id)"
              >
                <icon-quiz-trash class="w-4" />
              </button>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="!friendsOnlineFirst.length" class="text-center">
        Parece que há nada aqui!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { UserDefault } from "~/interfaces/UserDefault";
import { useFriends } from "~/store/friends";
import { useModals } from "~/store/modals";

const storeFriends = useFriends();
const { friends } = storeToRefs(storeFriends);

const storeModals = useModals();
const { modals } = storeToRefs(storeModals);

const friendsList = ref<UserDefault[]>(friends.value);

const searchValue = ref<string>("");

const friendsOnlineFirst = computed(() => {
  const newFriendsArray = [...friendsList.value].sort(
    (friendA: any, friendB: any) => {
      if (friendA.isOnline && !friendB.isOnline) {
        return -1;
      } else if (friendB.isOnline && !friendA.isOnline) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  return newFriendsArray;
});

watch(
  () => friends.value,
  () => {
    friendsList.value = friends.value;
  }
);

function onSearchHistory() {
  friendsList.value = storeFriends.searchFriend(searchValue.value);
}

function deleteFriendHandler(friendId: number) {
  modals.value.modalAlert.isOpen = true;
  modals.value.modalAlert.message =
    "O usuário será deletado da sua lista de amigos definitivamente!";
  modals.value.modalAlert.onConfirm = () => storeFriends.deleteFriend(friendId);
}
</script>

<style scoped>
.list_friends::-webkit-scrollbar-thumb {
  @apply bg-quiz-blue;
}

.list_friends::-webkit-scrollbar {
  width: 6px;
}

@media all and (max-width: 640px) {
  .list_friends {
    max-height: calc(100vh - 16rem);
  }
}
</style>
