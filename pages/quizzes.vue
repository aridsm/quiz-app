<template>
  <div class="grid grid-cols-3 gap-10">
    <nav class="col-span-1">
      <quiz-x-title class="mb-2">Categorias</quiz-x-title>
      <quiz-x-search-bar
        :show-results-list="false"
        :category="categoryActive"
        @onUpdate="filterResults"
      />
      <ul class="mt-4 text-quiz-grey-100 flex flex-col gap-2">
        <li v-for="category in categories" :key="category.name">
          <button
            type="button"
            class="py-2 rounded-md"
            :class="{
              'px-8 py-3 hover:text-quiz-blue-dark text-quiz-blue-dark bg-quiz-blue':
                categoryActive === category.id,
              'hover:text-quiz-blue': categoryActive !== category.id,
            }"
            @click="() => onChangeCategoryHandler(category)"
          >
            {{ category.name }}
          </button>
        </li>
      </ul>
    </nav>
    <nuxt-child
      :key="router.currentRoute.params.id"
      :quizzes="quizzesList"
      :search-value="searchValue"
      :category-active="categoryActive"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import { useRouter } from "@nuxtjs/composition-api";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { Quiz } from "~/interfaces/Quiz";
import { useQuizzes } from "~/store/quizzes";
import getCategoryData from "~/utilities/getCategoryData";

const { quizzes } = useQuizzes();
const router = useRouter();

const quizzesList = ref<Quiz[]>(quizzes);
const categoryActive = ref<QuizCategoryType | null>(null);
const searchValue = ref<string>("");

interface Category {
  name: string | null;
  id: QuizCategoryType | null;
  route: string;
}

const categories = ref<Category[]>([
  {
    name: getCategoryData(QuizCategoryType.Biology).name,
    id: QuizCategoryType.Biology,
    route: "/quizzes/biology",
  },
  {
    name: getCategoryData(QuizCategoryType.Geography).name,
    id: QuizCategoryType.Geography,
    route: "/quizzes/geography",
  },
  {
    name: getCategoryData(QuizCategoryType.Mathematics).name,
    id: QuizCategoryType.Mathematics,
    route: "/quizzes/mathematics",
  },
  {
    name: "Todas as categorias",
    id: null,
    route: "/quizzes/",
  },
]);

function onChangeCategoryHandler(category: Category) {
  categoryActive.value = category.id;
  router.replace(category.route);
}

function filterResults(val: string, results: Quiz[]) {
  quizzesList.value = results;
  searchValue.value = val;
}

function onChangeRoute() {
  if (!router.currentRoute.params.id) {
    categoryActive.value = null;
  } else if (router.currentRoute.params.id === "mathematics") {
    categoryActive.value = QuizCategoryType.Mathematics;
  } else if (router.currentRoute.params.id === "biology") {
    categoryActive.value = QuizCategoryType.Biology;
  } else if (router.currentRoute.params.id === "geography") {
    categoryActive.value = QuizCategoryType.Geography;
  }
}

onUpdated(() => {
  onChangeRoute();
});

onMounted(() => {
  onChangeRoute();
});
</script>
