<template>
  <div class="bg-quiz-grey-400 p-6 rounded-md border-2 border-quiz-border">
    <div>
      <p class="mb-6 text-quiz-grey-100">Categorias jogadas</p>
      <ul class="flex flex-col gap-3">
        <li
          v-for="category in user.categoriesPlayed"
          :key="category.id"
          class="flex items-center text-base p-4 bg-quiz-grey-300 rounded-md"
        >
          <p>{{ category.name }}</p>
          <span class="ml-auto text-quiz-blue text-base w-24 text-end">
            {{ category.victories }}
            {{ category.victories === 1 ? "vitória" : "vitórias" }}
          </span>
          <span class="ml-6 text-quiz-blue text-base w-24 text-end">
            {{ category.count - category.victories }}
            {{
              category.count - category.victories === 1 ? "derrota" : "derrotas"
            }}
          </span>
        </li>
      </ul>
    </div>
    <div class="mt-6 flex justify-between">
      <div>
        <p class="text-quiz-grey-100">Total vitórias</p>
        <span class="text-quiz-blue text-base">
          {{ totalVictories }}
          {{ totalVictories === 1 ? "vitória" : "vitórias" }}
        </span>
      </div>
      <div>
        <p class="text-quiz-grey-100">Total derrotas</p>
        <span class="text-quiz-blue text-base">
          {{ totalGamesPlayed - totalVictories }}
          {{ totalGamesPlayed - totalVictories === 1 ? "derrota" : "derrotas" }}
        </span>
      </div>
      <div>
        <p class="text-quiz-grey-100">Total partidas</p>
        <span class="text-quiz-blue text-base">
          {{ totalGamesPlayed }}
          {{ totalGamesPlayed === 1 ? "partida" : "partidas" }}
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
