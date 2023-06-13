<template>
  <div class="bg-quiz-blue-200 p-6">
    <div>
      <p class="mb-4 text-quiz-blue-100">Categorias jogadas</p>
      <ul class="flex flex-col gap-3">
        <li
          v-for="category in user.categoriesPlayed"
          :key="category.id"
          class="flex items-center text-base p-4 bg-[#43397E] rounded-sm"
        >
          <p>{{ category.name }}</p>
          <span class="ml-auto text-quiz-green-light text-base w-24 text-end">
            {{ category.victories }}
            {{ category.victories === 1 ? "vitória" : "vitórias" }}
          </span>
          <span class="ml-6 text-quiz-green-light text-base w-24 text-end">
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
        <p class="text-quiz-blue-100">Total vitórias</p>
        <span class="text-quiz-green-light text-base">
          {{ totalVictories }}
          {{ totalVictories === 1 ? "vitória" : "vitórias" }}
        </span>
      </div>
      <div>
        <p class="text-quiz-blue-100">Total derrotas</p>
        <span class="text-quiz-green-light text-base">
          {{ totalGamesPlayed - totalVictories }}
          {{ totalGamesPlayed - totalVictories === 1 ? "derrota" : "derrotas" }}
        </span>
      </div>
      <div>
        <p class="text-quiz-blue-100">Total partidas</p>
        <span class="text-quiz-green-light text-base">
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
