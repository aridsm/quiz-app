<template>
  <div class="grid grid-cols-3 gap-5">
    <section class="col-span-2">
      <quiz-x-title class="grid-2">
        Maiores pontuações dessa semana
      </quiz-x-title>
      <ul class="flex flex-col gap-5 w-full">
        <li v-for="user in dummyUsers" :key="user.userName" class="w-full">
          <quiz-x-card class="w-full flex items-center gap-8 px-8">
            <quiz-x-avatar :avatar="user.avatar" />
            <span class="w-20">{{ user.userName }}</span>
            <span class="text-quiz-green-light">LVL. {{ user.level }}</span>
            <div class="ml-auto flex items-center">
              <span>{{ user.trophies }}</span>
              <icon-quiz-trophy class="w-4 ml-2 text-quiz-green-light" />
            </div>
            <div class="flex items-center">
              <span>{{ user.score }} pts.</span>
              <icon-star-fill class="w-4 ml-2 text-quiz-green-light" />
            </div>
          </quiz-x-card>
        </li>
      </ul>
    </section>
    <section class="flex flex-col">
      <quiz-x-title class="grid-2"> Seu progresso </quiz-x-title>
      <ul class="flex-1 flex flex-col gap-5">
        <li class="w-full flex-1">
          <quiz-x-card
            class="px-6 w-full h-full bg-quiz-green-light text-quiz-green-dark border-none flex items-center justify-between"
          >
            <span>nível {{ data.level }}</span>
            <p>20 XP para o próximo nível</p>
          </quiz-x-card>
        </li>
        <li class="w-full flex-1">
          <quiz-x-card
            class="w-full h-full flex items-center justify-between px-6"
          >
            <span> Categoria mais jogada </span>
            <span class="relative">
              <span class="text-quiz-green-light">{{
                mostPlayedCategories[0].name
              }}</span>
              <p
                v-if="mostPlayedCategories.length > 1"
                class="absolute text-sm -mt-1 text-quiz-blue-100 right-0"
              >
                E mais {{ mostPlayedCategories.length - 1 }}
              </p>
            </span>
          </quiz-x-card>
        </li>
        <li class="w-full flex-1">
          <quiz-x-card
            class="px-6 w-full h-full flex items-center justify-between"
          >
            <span>Total de partidas jogadas</span>
            <span class="text-quiz-green-light text-2xl">{{
              data.totalGamesPlayed
            }}</span>
          </quiz-x-card>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useUserDataStore } from "~/store/userData";

const userData = useUserDataStore();
const { data, mostPlayedCategories } = storeToRefs(userData);

interface User {
  avatar: string;
  userName: string;
  level: number;
  score: number;
  trophies: number;
}

const dummyUsers = ref<User[]>([
  {
    avatar: "av-2",
    userName: "oll13",
    level: 40,
    score: 325,
    trophies: 12,
  },
  {
    avatar: "av-9",
    userName: "xdaanny",
    level: 39,
    score: 305,
    trophies: 11,
  },
  {
    avatar: "av-1",
    userName: "prijx",
    level: 42,
    score: 295,
    trophies: 9,
  },
]);
</script>
