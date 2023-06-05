<template>
  <quiz-x-card class="col-span-2 w-full p-6">
    <p class="text-center text-[1.6rem] leading-snug">
      {{ currentGame.currentQuestionIndex + 1 }}.
      {{ currentQuestion.question }}
    </p>
    <div v-if="questionIsFlag">
      <img
        :src="currentQuestion.item?.replace('/static', '')"
        class="w-52 block mx-auto my-4 pointer-events-none"
      />
    </div>
    <div v-else>
      <p class="text-center text-quiz-green-light text-[1.6rem] my-4">
        {{ currentQuestion.item }}
      </p>
    </div>
    <ul v-if="!answerIsAFlag" class="flex flex-col gap-3">
      <li v-for="(answer, index) in currentQuestion.otherAnswers" :key="answer">
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
          <span>{{ answer }}</span>
        </button>
      </li>
    </ul>
    <game-item-choice-img
      v-if="answerIsAFlag"
      :current-question="currentQuestion"
      :select-answer-handler="selectAnswerHandler"
      :selected-answer="selectedAnswer"
    />
    <div class="flex justify-between items-end">
      <p class="text-quiz-green-light text-sm pl-2">
        {{ currentGame.correctAnswers }} resposta(s) correta(s)
      </p>
      <quiz-btn
        class="mt-4 ml-auto table"
        :disabled="!selectedAnswer"
        @click="sendSelectedAnswer"
      >
        Próximo
      </quiz-btn>
    </div>
  </quiz-x-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { GeoQuizType } from "~/enums/geoQuizType";
import { Question } from "~/interfaces/Question";
import { useCurrentGame } from "~/store/currentGame";

const storeCurrentGame = useCurrentGame();
const { isFlag, currentGame } = storeToRefs(storeCurrentGame);

const selectedAnswer = ref<number | string>("");

const questionIsFlag = computed<boolean>(() => {
  return (
    isFlag && currentGame.value.geoQuizType === GeoQuizType.FromFlagCapital
  );
});

const currentQuestion = computed<Question>(() => {
  return currentGame.value.questions[currentGame.value.currentQuestionIndex];
});

const answerIsAFlag = computed<boolean>(() => {
  return (
    isFlag && currentGame.value.geoQuizType === GeoQuizType.FromStateCountry
  );
});

function selectAnswerHandler(answer: string | number) {
  selectedAnswer.value = answer;
}

function sendSelectedAnswer() {
  storeCurrentGame.validateAnswer(selectedAnswer.value);
  selectedAnswer.value = "";
}
</script>

<style>
.selected-answer {
  box-shadow: 0 0 0 2px #59ff88;
  @apply text-quiz-green-light;
}
</style>
