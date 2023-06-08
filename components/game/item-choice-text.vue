<template>
  <ul class="flex flex-col gap-3">
    <li v-for="(answer, index) in currentQuestion.otherAnswers" :key="answer">
      <button
        class="button-choice flex gap-3 items-center hover:bg-quiz-blue-200 hover:text-quiz-green-light p-2 w-full rounded-md"
        :class="{
          'selected-answer bg-quiz-blue-200': selectedAnswer === answer,
        }"
        :disabled="disabled && answer !== selectedAnswer"
        @click="() => selectAnswerHandler(answer)"
      >
        <span
          class="text-sm w-8 h-8 pl-[2px] flex items-center justify-center bg-quiz-green-light text-quiz-green-dark rounded-full"
        >
          {{ getItemsOrderLetter(index) }}
        </span>
        <span>{{ answer }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Question } from "~/interfaces/Question";

interface Props {
  currentQuestion: Question;
  selectAnswerHandler: Function;
  selectedAnswer: string;
  disabled?: boolean;
}

defineProps<Props>();

function getItemsOrderLetter(number: number) {
  switch (number) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    case 4:
      return "E";
    default:
      return "";
  }
}
</script>

<style scoped>
.button-choice:disabled {
  @apply text-quiz-blue-100 hover:bg-transparent hover:text-quiz-blue-100;
}
</style>
