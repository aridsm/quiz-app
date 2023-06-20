<template>
  <ul class="flex flex-col gap-3">
    <li v-for="(answer, index) in currentQuestion.otherAnswers" :key="answer">
      <button
        class="button-choice pr-5 flex gap-3 items-center hover:bg-quiz-grey-200 hover:text-quiz-blue p-2 w-full rounded-md"
        :class="{
          'bg-quiz-grey-200': answerIsTheCorrect(answer),
          'selected-answer bg-quiz-grey-200': selectedAnswer === answer,
        }"
        :disabled="disabled && answer !== selectedAnswer"
        @click="() => selectAnswerHandler(answer)"
      >
        <span
          class="text-xs md:text-sm w-6 h-6 md:w-8 md:h-8 pl-[2px] flex items-center justify-center bg-quiz-blue text-quiz-blue-dark rounded-full"
        >
          {{ getItemsOrderLetter(index) }}
        </span>
        <div class="flex justify-between items-center flex-1">
          <p
            class="tracking-wide"
            :class="{
              'text-quiz-blue': answerIsTheCorrect(answer),
            }"
          >
            {{ fixAnswer(answer) }}
          </p>
          <icon-quiz-checkmark
            v-if="answerIsTheCorrect(answer)"
            class="w-4 text-quiz-blue"
          />
          <icon-quiz-xmark
            v-if="answerIsIncorrect && answer === selectedAnswer"
            class="w-4 text-quiz-pink"
          />
        </div>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { AnswerSimilarity } from "~/enums/answerSimilarity";
import { Question } from "~/interfaces/Question";
import { useCurrentGame } from "~/store/currentGame";
import getItemsOrderLetter from "~/utilities/getMultipleChoiceLetter";

interface Props {
  currentQuestion: Question;
  selectAnswerHandler: Function;
  selectedAnswer: string;
  disabled?: boolean;
  correctAnswer: string;
}

const props = defineProps<Props>();

const storeCurrentGame = useCurrentGame();
const { currentGame } = storeToRefs(storeCurrentGame);

const answerWasValidated = computed<boolean>(() => {
  return currentGame.value.answerSimilarity !== AnswerSimilarity.NotValidated;
});

const answerIsIncorrect = computed<boolean>(() => {
  return currentGame.value.answerSimilarity === AnswerSimilarity.NotSimilar;
});

function answerIsTheCorrect(answer: any) {
  return answerWasValidated.value && answer === props.correctAnswer;
}

function fixAnswer(answer: string | string[] | number) {
  let fixedAnswer = answer;
  if (typeof fixedAnswer === "object") {
    fixedAnswer = fixedAnswer.map((item: string) => item).join(", ");
  }
  return fixedAnswer;
}
</script>

<style scoped>
.button-choice:disabled {
  @apply text-quiz-grey-100 hover:bg-quiz-grey-200 hover:text-quiz-grey-100;
}
</style>
