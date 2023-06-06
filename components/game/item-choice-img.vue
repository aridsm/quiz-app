<template>
  <ul class="grid grid-cols-2 gap-2">
    <li
      v-for="(answer, index) in currentQuestion.otherAnswers"
      :key="answer"
      class="col-span-1"
    >
      <button
        class="flex gap-3 items-center hover:bg-quiz-blue-200 hover:text-quiz-green-light p-2 w-full rounded-md"
        :class="{
          'selected-answer bg-quiz-blue-200': selectedAnswer === answer,
        }"
        @click="() => selectAnswerHandler(answer)"
      >
        <span
          class="text-sm w-8 h-8 p-1 flex items-center justify-center bg-quiz-green-light text-quiz-green-dark rounded-full"
        >
          {{ index + 1 }}
        </span>
        <div class="w-32 h-20">
          <img
            :src="String(answer).replace('/static', '')"
            class="w-full h-full object-contain"
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
</script>

<style></style>
