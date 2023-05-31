<template>
  <div class="grid grid-cols-3 gap-10">
    <nav class="col-span-1">
      <quiz-x-title>Categorias</quiz-x-title>
      <quiz-x-search-bar
        :show-results-list="false"
        :category="categoryActive"
        @onUpdate="filterResults"
      />
      <ul class="mt-4 text-quiz-blue-100 flex flex-col gap-2">
        <li v-for="category in categories" :key="category.name">
          <button
            type="button"
            class="py-2 rounded-md"
            :class="{
              'px-6 hover:text-quiz-green-dark text-quiz-green-dark bg-quiz-green-light':
                categoryActive === category.id,
              'hover:text-quiz-green-light': categoryActive !== category.id,
            }"
            @click="() => onChangeCategoryHandler(category)"
          >
            {{ category.name }}
          </button>
        </li>
      </ul>
    </nav>
    <div class="col-span-2">
      <div class="mb-2 flex justify-between items-center">
        <quiz-x-title class="mb-0">Todos os Quizzes</quiz-x-title>
        <div class="text-sm flex items-center text-quiz-green-light">
          <div>
            {{
              categoryActive
                ? getCategoryData(categoryActive).name
                : "Todas as Categorias"
            }}
          </div>
          <icon-quiz-arrow
            v-if="searchValue"
            class="w-2 -rotate-90 -mt-[2px] ml-1 mr-2"
          />
          <div v-if="searchValue">"{{ searchValue }}"</div>
        </div>
      </div>
      <ul class="grid grid-cols-2 gap-5">
        <li v-for="quiz in quizzesList" :key="quiz.id" class="w-full">
          <quiz-x-quiz-card :title="quiz.name" class="w-full" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { Quiz } from "~/interfaces/Quiz";
import { useQuizzes } from "~/store/quizzes";
import getCategoryData from "~/utilities/getCategoryData";

const { quizzes, filterBy } = useQuizzes();

const quizzesList = ref<Quiz[]>(quizzes);
const categoryActive = ref<QuizCategoryType | null>(null);
const searchValue = ref<string>("");

interface Category {
  name: string;
  id: QuizCategoryType | null;
}

const categories = ref<Category[]>([
  {
    name: getCategoryData(QuizCategoryType.Biology).name,
    id: QuizCategoryType.Biology,
  },
  {
    name: getCategoryData(QuizCategoryType.Geography).name,
    id: QuizCategoryType.Geography,
  },
  {
    name: getCategoryData(QuizCategoryType.Mathematics).name,
    id: QuizCategoryType.Mathematics,
  },
  {
    name: "Todas as categorias",
    id: null,
  },
]);

function onChangeCategoryHandler(category: Category) {
  categoryActive.value = category.id;

  if (category.id) {
    filterBy({ category: category.id });
  }
}

function filterResults(val: string, results: Quiz[]) {
  quizzesList.value = results;
  searchValue.value = val;
}
</script>

<style></style>
