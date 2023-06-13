<template>
  <div class="flex items-center">
    <div class="flex items-center text-quiz-green-light gap-8 mr-8">
      <div class="flex items-center">
        <span>{{ data.coinsCount }}</span>
        <icon-quiz-coins class="w-4 ml-2" />
      </div>
      <div class="flex items-center">
        <span>{{ data.friendsCount }}</span>
        <icon-quiz-people class="w-5 ml-2" />
      </div>
    </div>
    <quiz-toggle-activator :arrow-indicator="true" arrow-side="left">
      <template #activator>
        <quiz-x-avatar :avatar="data.avatarUrl" />
      </template>
      <template #content>
        <ul class="flex flex-col gap-2">
          <li v-for="option in profileOptions" :key="option.name">
            <button
              class="flex items-center hover:text-quiz-green-light"
              :class="{
                'text-quiz-green-light': option.id === ProfileOptions.Exit,
              }"
              @click="option.action"
            >
              {{ option.name }}
              <icon-quiz-exit
                v-if="option.id === ProfileOptions.Exit"
                class="w-4 ml-3 -mt-[3px]"
              />
            </button>
          </li>
        </ul>
      </template>
    </quiz-toggle-activator>
    <div class="flex flex-col gap-1 ml-3">
      <div class="flex items-center justify-between text-base">
        <span>{{ data.userName }}</span>
        <span :aria-label="`nível ${data.level}`">LVL. {{ data.level }}</span>
      </div>
      <quiz-progress-bar
        :value="data.currentXp"
        :max-value="totalXpInCurrentLevel"
      />
    </div>
    <quiz-toggle-activator class="ml-8">
      <template #activator>
        <div class="relative">
          <icon-quiz-bell class="w-4 text-quiz-green-light" />
          <div
            v-if="data.hasNotifications"
            class="w-2 h-2 bg-quiz-pink absolute left-full -top-1 rounded-full"
          />
        </div>
      </template>
      <template #content>Notificações</template>
    </quiz-toggle-activator>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { ProfileOptions } from "../../enums/profileOptions";
import { useUserDataStore } from "~/store/userData";
import { useModals } from "~/store/modals";

interface Options {
  action: Function;
  name: string;
  id: number;
}

const userStore = useUserDataStore();
const useModalStore = useModals();

const { data, totalXpInCurrentLevel } = storeToRefs(userStore);

const profileOptions = ref<Options[]>([
  {
    action: showProfile,
    name: "Seu perfil",
    id: ProfileOptions.Profile,
  },
  {
    action: showFriend,
    name: "Amigos",
    id: ProfileOptions.Friends,
  },
  {
    action: showMessages,
    name: "Seu histórico",
    id: ProfileOptions.History,
  },
  {
    action: logout,
    name: "Sair",
    id: ProfileOptions.Exit,
  },
]);

function showProfile() {
  useModalStore.modals.modalProfileIsOpen = true;
}

function showFriend() {}
function showMessages() {}
function logout() {}
</script>
