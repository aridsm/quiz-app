<template>
  <div class="col-span-2">
    <div class="mb-2 flex justify-between items-center">
      <quiz-x-title class="mb-0">Lista de Quizzes</quiz-x-title>
      <div class="text-sm flex items-center text-quiz-blue">
        <div>
          {{
            categoryActive
              ? getCategoryData(categoryActive).name
              : "Todas as Categorias"
          }}
        </div>
        <icon-quiz-arrow v-if="searchValue" class="w-2 -rotate-90 ml-1 mr-2" />
        <div v-if="searchValue">"{{ searchValue }}"</div>
      </div>
    </div>
    <ul v-if="quizzes.length" class="grid grid-cols-2 gap-5">
      <li v-for="quiz in quizzes" :key="quiz.id" class="w-full">
        <quiz-x-quiz-card
          :quiz="quiz"
          :chip="{
            color: getCategoryData(quiz.category).color,
            chipName: getCategoryData(quiz.category).name,
          }"
          class="w-full"
        />
      </li>
    </ul>
    <p v-else class="text-center mt-4">
      Não foi encontrado nenhum resultado para essa pesquisa!
    </p>
  </div>
</template>

<script setup lang="ts">
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { Quiz } from "~/interfaces/Quiz";
import getCategoryData from "~/utilities/getCategoryData";

interface Props {
  quizzes: Quiz[];
  searchValue: string;
  categoryActive: QuizCategoryType;
}

defineProps<Props>();
</script>

<style></style>
