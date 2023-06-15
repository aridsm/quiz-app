<template>
  <ul class="grid grid-cols-2 gap-4 gap-x-10">
    <li
      v-for="(answer, index) in currentQuestion.otherAnswers"
      :key="answer"
      class="col-span-1 w-auto"
    >
      <button
        class="flex gap-3 items-center hover:bg-quiz-grey-200 hover:text-quiz-blue p-2 w-full rounded-md"
        :class="{
          'selected-answer bg-quiz-grey-200': selectedAnswer === answer,
        }"
        @click="() => selectAnswerHandler(answer)"
      >
        <span
          class="text-md w-8 h-8 p-1 flex items-center justify-center bg-transparent text-quiz-white rounded-full"
        >
          {{ getItemsOrderLetter(index) }}
        </span>
        <div class="w-32 h-20 m-auto">
          <img
            :src="String(answer).replace('/static', '')"
            class="w-full h-full object-contain object-center"
          />
        </div>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Question } from "~/interfaces/Question";
import getItemsOrderLetter from "~/utilities/getMultipleChoiceLetter";

interface Props {
  currentQuestion: Question;
  selectAnswerHandler: Function;
  selectedAnswer: string;
}

defineProps<Props>();
</script>

<style></style>
