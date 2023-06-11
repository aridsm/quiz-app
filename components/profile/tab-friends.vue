<template>
  <div class="bg-quiz-blue-200">
    <ul
      class="flex p-4 flex-col gap-6 max-h-[12rem] overflow-y-auto list_friends"
    >
      <li
        v-for="friend in friendsOnlineFirst"
        :key="friend.id"
        class="flex items-center"
      >
        <quiz-x-avatar :avatar="friend.avatarUrl" />
        <p class="w-auto ml-5">
          {{ friend.userName }}
        </p>
        <div
          v-if="friend.isOnline"
          class="w-2 h-2 bg-quiz-green-light rounded-full ml-3"
        />
        <div class="ml-auto flex items-center gap-6 text-quiz-blue-100">
          <div v-title="'enviar mensagem'">
            <button
              class="hover:text-quiz-green-light active:scale-95"
              @click="openModalMessagesHandler"
            >
              <icon-quiz-paperplane class="w-4" />
            </button>
          </div>
          <div v-title="'excluir amigo'">
            <button
              class="hover:text-quiz-green-light active:scale-95"
              @click="deleteFriendHandler"
            >
              <icon-quiz-trash class="w-4" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useFriends } from "~/store/friends";

const storeFriends = useFriends();
const { friends } = storeToRefs(storeFriends);

const friendsOnlineFirst = computed(() => {
  const newFriendsArray = [...friends.value].sort(
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

function deleteFriendHandler() {}

function openModalMessagesHandler() {}
</script>

<style scoped>
.list_friends::-webkit-scrollbar-thumb {
  @apply bg-quiz-green-light;
}

.list_friends::-webkit-scrollbar {
  width: 6px;
}
</style>
