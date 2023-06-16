<template>
  <div class="bg-quiz-grey-400 rounded-md border-2 border-quiz-border">
    <div class="flex justify-between items-center px-6 py-4">
      <p class="text-quiz-grey-100">Seus amigos</p>
      <quiz-input-text
        :model.sync="searchValue"
        placeholder="Procure por um amigo..."
        class="w-60 py-3 text-base"
        style="background: #1f202c; width: 15rem"
        @input="onSearchHistory"
      />
    </div>

    <div class="py-4 px-6 pt-0 h-[20rem] overflow-auto list_friends">
      <ul class="flex flex-col gap-3">
        <li
          v-for="friend in friendsOnlineFirst"
          :key="friend.id"
          class="flex items-center p-4 bg-quiz-grey-300 rounded-md"
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
            <div v-title="'enviar mensagem'">
              <button
                class="hover:text-quiz-blue active:scale-95"
                @click="openModalMessagesHandler"
              >
                <icon-quiz-paperplane class="w-4" />
              </button>
            </div>
            <div v-title="'excluir amigo'">
              <button
                class="hover:text-quiz-blue active:scale-95"
                @click="deleteFriendHandler"
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
import { computed, ref } from "vue";
import { Friend } from "~/interfaces/Friend";
import { useFriends } from "~/store/friends";

const storeFriends = useFriends();
const { friends } = storeToRefs(storeFriends);

const friendsList = ref<Friend[]>(friends.value);
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

function onSearchHistory() {
  friendsList.value = storeFriends.searchGame(searchValue.value);
}

function deleteFriendHandler() {}

function openModalMessagesHandler() {}
</script>

<style scoped>
.list_friends::-webkit-scrollbar-thumb {
  @apply bg-quiz-blue;
}

.list_friends::-webkit-scrollbar {
  width: 6px;
}
</style>
