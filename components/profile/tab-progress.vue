<template>
  <div class="bg-quiz-grey-400 p-3 sm:p-6 rounded-md">
    <div>
      <p class="mb-3 sm:mb-6 text-quiz-grey-100">Categorias jogadas</p>
      <ul class="flex flex-col gap-1 sm:gap-2">
        <li
          v-for="category in storeGamesPlayed.categoriesPlayed"
          :key="category.id"
          class="flex items-center text-base p-3 sm:p-4 bg-quiz-grey-300 rounded-md"
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
    <div
      class="mt-6 flex gap-y-3 gap-x-8 flex-wrap justify-center sm:justify-between"
    >
      <div>
        <p class="text-quiz-grey-100">Total vitórias</p>
        <span class="text-quiz-blue text-base">
          {{ storeGamesPlayed.totalVictories }}
          {{ storeGamesPlayed.totalVictories === 1 ? "vitória" : "vitórias" }}
        </span>
      </div>
      <div>
        <p class="text-quiz-grey-100">Total derrotas</p>
        <span class="text-quiz-blue text-base">
          {{
            storeGamesPlayed.totalGamesPlayed - storeGamesPlayed.totalVictories
          }}
          {{
            storeGamesPlayed.totalGamesPlayed -
              storeGamesPlayed.totalVictories ===
            1
              ? "derrota"
              : "derrotas"
          }}
        </span>
      </div>
      <div>
        <p class="text-quiz-grey-100">Total partidas</p>
        <span class="text-quiz-blue text-base">
          {{ storeGamesPlayed.totalGamesPlayed }}
          {{ storeGamesPlayed.totalGamesPlayed === 1 ? "partida" : "partidas" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLastGamesPlayed } from "~/store/lastGamesPlayed";

const storeGamesPlayed = useLastGamesPlayed();
</script>
