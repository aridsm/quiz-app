<template>
  <quiz-x-card class="col-span-2 w-full p-6">
    <p class="text-center text-[1.6rem] leading-snug">
      {{ currentGame.currentQuestionIndex + 1 }}.
      {{ currentQuestion.question }}
    </p>
    <div v-if="questionIsFlag">
      <div class="h-32 mx-auto my-4">
        <img
          :src="String(currentQuestion.item).replace('/static', '')"
          class="h-full mx-auto pointer-events-none object-fill"
        />
      </div>
    </div>
    <div v-else>
      <p class="text-center text-quiz-green-light text-[1.6rem] my-4">
        {{ currentQuestion.item }}
      </p>
    </div>
    <quiz-input-text
      v-if="!gameIsMultipleChoice"
      :model.sync="selectedAnswer"
      placeholder="Digite sua resposta..."
      class="w-full"
    />
    <game-item-choice-text
      v-if="!answerIsAFlag && gameIsMultipleChoice"
      :current-question="currentQuestion"
      :select-answer-handler="selectAnswerHandler"
      :selected-answer="selectedAnswer"
    />
    <game-item-choice-img
      v-if="answerIsAFlag && gameIsMultipleChoice"
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
import { AnswerMode } from "~/enums/answerMode";
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

const gameIsMultipleChoice = computed<boolean>(() => {
  return currentGame.value.answerMode === AnswerMode.MultipleChoice;
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
