<template>
  <ul class="grid grid-cols-2 gap-4 gap-x-8">
    <li
      v-for="(answer, index) in currentQuestion.otherAnswers"
      :key="answer"
      class="col-span-1 w-auto"
    >
      <button
        class="flex gap-3 items-start hover:bg-quiz-blue-200 hover:text-quiz-green-light p-2 w-full rounded-md"
        :class="{
          'selected-answer bg-quiz-blue-200': selectedAnswer === answer,
        }"
        @click="() => selectAnswerHandler(answer)"
      >
        <span
          class="text-sm w-8 h-8 p-1 flex items-center justify-center bg-quiz-green-light text-quiz-green-dark rounded-full"
        >
          {{ getItemsOrderLetter(index) }}
        </span>
        <div class="w-32 h-20">
          <img
            :src="String(answer).replace('/static', '')"
            class="w-full h-full object-contain object-top"
          />
        </div>
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

<style></style>
