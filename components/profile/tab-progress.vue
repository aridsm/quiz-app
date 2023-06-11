<template>
  <div class="bg-quiz-blue-200 p-4">
    <div>
      <quiz-x-title class="mb-4">Categorias jogadas</quiz-x-title>
      <ul class="flex flex-col gap-2">
        <li
          v-for="category in user.categoriesPlayed"
          :key="category.id"
          class="flex items-center"
        >
          <p>{{ category.name }}</p>
          <span class="ml-auto text-quiz-green-light text-sm">
            {{ category.victories }} vitórias
          </span>
          <span class="ml-6 text-quiz-green-light text-sm">
            {{ category.count - category.victories }} derrotas
          </span>
        </li>
      </ul>
    </div>
    <div class="mt-6 flex justify-between">
      <div>
        <quiz-x-title>Total vitórias</quiz-x-title>
        <span class="text-quiz-green-light text-sm">
          {{ totalVictories }} vitórias
        </span>
      </div>
      <div>
        <quiz-x-title>Total derrotas</quiz-x-title>
        <span class="text-quiz-green-light text-sm">
          {{ totalGamesPlayed - totalVictories }} derrotas
        </span>
      </div>
      <div>
        <quiz-x-title>Total partidas</quiz-x-title>
        <span class="text-quiz-green-light text-sm">
          {{ totalGamesPlayed }} partidas
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserDataStore } from "~/store/userData";

const storeUserData = useUserDataStore();
const {
  data: user,
  totalVictories,
  totalGamesPlayed,
} = storeToRefs(storeUserData);
</script>
