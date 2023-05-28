<template>
  <div class="flex items-center">
    <div class="flex items-center text-quiz-green-light gap-8 mr-8">
      <div class="flex items-center">
        <span>214</span>
        <icon-quiz-coins class="w-4 ml-2" />
      </div>
      <div class="flex items-center">
        <span>8</span>
        <icon-quiz-people class="w-5 ml-2" />
      </div>
    </div>
    <quiz-toggle-activator :arrow-indicator="true" arrow-side="left">
      <template #activator> <quiz-img-avatar avatar="av-2" /> </template>
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
        <span>User_143</span>
        <span>LVL 1</span>
      </div>
      <quiz-progress-bar :value="100" :max-value="250" />
    </div>
    <quiz-toggle-activator class="ml-8">
      <template #activator><icon-quiz-bell class="w-4" /></template>
      <template #content>Notificações</template>
    </quiz-toggle-activator>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ProfileOptions } from "../../enums/profileOptions";

interface Options {
  action: Function;
  name: string;
  id: number;
}

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
    name: "Mensagens",
    id: ProfileOptions.Messages,
  },
  {
    action: logout,
    name: "Sair",
    id: ProfileOptions.Exit,
  },
]);

function showProfile() {}
function showFriend() {}
function showMessages() {}
function logout() {}
</script>
