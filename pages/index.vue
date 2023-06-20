<template>
  <div>
    <div class="grid grid-cols-3 gap-12 sm:gap-16 md:gap-20 xl:gap-3">
      <section class="col-span-3 xl:col-span-2">
        <quiz-x-title class="grid-2 mb-4 leading-none">
          Maiores pontuações dessa semana
        </quiz-x-title>
        <ul class="flex flex-col gap-2 md:gap-3 w-full">
          <li
            v-for="user in biggestScoresUsers"
            :key="user.userName"
            class="w-full"
          >
            <quiz-x-card
              class="w-full flex items-center gap-4 md:gap-8 md:px-9 py-4 md:py-6"
            >
              <quiz-x-avatar :avatar="user.avatarUrl" />
              <div class="flex flex-col md:flex-row md:gap-8">
                <span class="w-16 md:w-20">{{ user.userName }}</span>
                <span class="text-quiz-blue text-sm md:text-base">
                  LVL. {{ user.level }}
                </span>
              </div>
              <div class="ml-auto flex items-center">
                <span>{{ user.trophiesCount }}</span>
                <icon-quiz-trophy
                  class="w-3 md:w-4 ml-3 md:-mt-[2px] text-quiz-blue"
                />
              </div>
              <div class="flex items-center">
                <span>{{ user.score }}</span>
                <icon-star-fill
                  class="w-3 md:w-4 ml-3 md:-mt-[2px] text-quiz-blue"
                />
              </div>
            </quiz-x-card>
          </li>
        </ul>
      </section>
      <section
        class="flex flex-col -order-1 col-span-3 xl:order-1 xl:col-span-1"
      >
        <quiz-x-title class="grid-2 mb-4 leading-none">
          Seu progresso
        </quiz-x-title>
        <ul class="flex-1 grid grid-cols-2 md:flex xl:flex-col gap-2 md:gap-3">
          <li class="w-full col-span-2 flex-1">
            <quiz-x-card
              class="lg:px-6 w-full h-full flex flex-col xl:flex-row text-center items-center justify-center xl:justify-between"
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
              class="lg:px-6 w-full h-full flex flex-col xl:flex-row text-center items-center justify-center xl:justify-between"
            >
              <p>Categoria mais jogada</p>
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
              class="lg:px-6 w-full h-full flex flex-col xl:flex-row text-center items-center justify-center xl:justify-between"
            >
              <p>Total de partidas jogadas</p>
              <span class="text-quiz-blue lg:text-2xl">{{
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
import { useLastGamesPlayed } from "~/store/lastGamesPlayed";
import { useUserDataStore } from "~/store/userData";
import { useUsers } from "~/store/users";

const userData = useUserDataStore();
const { data, totalXpInCurrentLevel } = storeToRefs(userData);

const gamesPlayed = useLastGamesPlayed();
const { lastGamesPlayed, totalGamesPlayed, mostPlayedCategories } =
  storeToRefs(gamesPlayed);

const usersStore = useUsers();

const categoriesPlayed = computed(() => {
  return lastGamesPlayed.value.map((category: any) => category.name).join(", ");
});

const biggestScoresUsers = ref<UserDefault[]>(
  usersStore.usersBiggestsScores.slice(0, 3)
);
</script>
