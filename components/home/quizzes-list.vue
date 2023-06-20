<template>
  <section class="mt-12 sm:mt-16 md:mt-28">
    <div class="flex items-center justify-between mb-4 leading-none">
      <quiz-x-title>Quizzes</quiz-x-title>
      <nuxt-link to="/quizzes" class="text-quiz-blue flex items-center">
        Todos os quizzes
        <icon-quiz-arrow class="ml-1 md:ml-2 w-2 md:w-3 -rotate-90" />
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
      <li v-for="quiz in quizzesList" :key="quiz.name">
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
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import getCategoryData from "../../utilities/getCategoryData";
import { useQuizzes } from "~/store/quizzes";

const store = useQuizzes();

const { quizzes } = storeToRefs(store);

const quizzesList = computed(() => {
  return quizzes.value.slice(0, 6);
});
</script>

<style></style>
