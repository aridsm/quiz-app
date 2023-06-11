<template>
  <div class="bg-quiz-blue-200 p-4">
    <ul class="flex flex-col gap-6">
      <li v-for="friend in friends" :key="friend.id" class="flex items-center">
        <quiz-x-avatar :avatar="friend.avatarUrl" />
        <p class="w-auto ml-5">
          {{ friend.userName }}
        </p>
        <div
          v-if="friend.isOnline"
          class="w-2 h-2 bg-quiz-green-light rounded-full ml-3"
        />
        <div class="ml-auto flex items-center gap-6 text-quiz-blue-100">
          <quiz-x-tooltip title="enviar mensagem">
            <button
              class="hover:text-quiz-green-light active:scale-95"
              @click="deleteFriendHandler"
            >
              <icon-quiz-trash class="w-4" />
            </button>
          </quiz-x-tooltip>

          <quiz-x-tooltip title="excluir amigo">
            <button
              class="hover:text-quiz-green-light active:scale-95"
              @click="openModalMessagesHandler"
            >
              <icon-quiz-paperplane class="w-4" />
            </button>
          </quiz-x-tooltip>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFriends } from "~/store/friends";

const storeFriends = useFriends();
const { friends } = storeToRefs(storeFriends);

function deleteFriendHandler() {}

function openModalMessagesHandler() {}
</script>
