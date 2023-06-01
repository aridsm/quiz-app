<template>
  <quizzes-quiz-list
    :quizzes="quizzes"
    :search-value="searchValue"
    :category-active="categoryActive"
  />
</template>

<script setup lang="ts">
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { QuizCategory } from "~/interfaces/QuizCategory";

interface Props {
  quizzes: QuizCategory[];
  searchValue: string;
  categoryActive: QuizCategoryType;
}

defineProps<Props>();
</script>
