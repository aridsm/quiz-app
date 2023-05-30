<template>
  <section class="mt-24">
    <div class="flex items-center justify-between mb-2">
      <quiz-x-title class="mb-0">Quizzes</quiz-x-title>
      <nuxt-link
        to="/quizzes/all"
        class="text-quiz-green-light flex items-center leading-none"
      >
        Todos os quizzes <icon-quiz-arrow class="ml-2 w-3 -rotate-90" />
      </nuxt-link>
    </div>
    <ul class="grid grid-cols-3 gap-5">
      <li v-for="quiz in quizzesList" :key="quiz.name">
        <quiz-x-quiz-card
          :title="quiz.name"
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
