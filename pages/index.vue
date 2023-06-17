<template>
  <div>
    <div class="grid grid-cols-3 gap-3">
      <section class="col-span-2">
        <quiz-x-title class="grid-2 mb-4 leading-none">
          Maiores pontuações dessa semana
        </quiz-x-title>
        <ul class="flex flex-col gap-3 w-full">
          <li
            v-for="user in biggestScoresUsers"
            :key="user.userName"
            class="w-full"
          >
            <quiz-x-card class="w-full flex items-center gap-8 px-9 py-6">
              <quiz-x-avatar :avatar="user.avatarUrl" />
              <span class="w-20">{{ user.userName }}</span>
              <span class="text-quiz-blue">LVL. {{ user.level }}</span>
              <div class="ml-auto flex items-center">
                <span>{{ user.trophiesCount }}</span>
                <icon-quiz-trophy class="w-4 ml-3 -mt-[2px] text-quiz-blue" />
              </div>
              <div class="flex items-center">
                <span>{{ user.score }} pts.</span>
                <icon-star-fill class="w-4 ml-3 -mt-[2px] text-quiz-blue" />
              </div>
            </quiz-x-card>
          </li>
        </ul>
      </section>
      <section class="flex flex-col">
        <quiz-x-title class="grid-2 mb-4 leading-none">
          Seu progresso
        </quiz-x-title>
        <ul class="flex-1 flex flex-col gap-3">
          <li class="w-full flex-1">
            <quiz-x-card
              class="px-6 w-full h-full flex items-center justify-between"
              style="background: #313242"
            >
              <span class="text-quiz-blue">Nível {{ data.level }}</span>
              <p>
                {{ totalXpInCurrentLevel - data.currentXp }} XP para o próximo
                nível
              </p>
            </quiz-x-card>
          </li>
          <li class="w-full flex-1">
            <quiz-x-card
              class="w-full h-full flex items-center justify-between px-5"
            >
              <span> Categoria mais jogada </span>
              <span
                v-if="mostPlayedCategories.length === 1"
                class="text-quiz-blue"
              >
                <span>
                  {{ mostPlayedCategories[0].name }}
                </span>
              </span>
              <span
                v-else-if="mostPlayedCategories.length > 1"
                class="text-quiz-blue"
              >
                <div v-title="categoriesPlayed">Variadas</div>
              </span>
            </quiz-x-card>
          </li>
          <li class="w-full flex-1">
            <quiz-x-card
              class="px-6 w-full h-full flex items-center justify-between"
            >
              <span>Total de partidas jogadas</span>
              <span class="text-quiz-blue text-2xl">{{
                totalGamesPlayed
              }}</span>
            </quiz-x-card>
          </li>
        </ul>
      </section>
    </div>
    <home-quizzes-list />
    <home-last-games-played />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { UserDefault } from "~/interfaces/UserDefault";
import { useUserDataStore } from "~/store/userData";
import { useUsers } from "~/store/users";

const userData = useUserDataStore();
const { data, totalGamesPlayed, mostPlayedCategories, totalXpInCurrentLevel } =
  storeToRefs(userData);

const usersStore = useUsers();

const categoriesPlayed = computed(() => {
  return mostPlayedCategories.value
    .map((category: any) => category.name)
    .join(", ");
});

const biggestScoresUsers = ref<UserDefault[]>(
  usersStore.usersBiggestsScores.splice(0, 3)
);
</script>
