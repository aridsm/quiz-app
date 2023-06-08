<template>
  <quiz-x-card class="col-span-2 w-full relative overflow-hidden p-0">
    <quiz-progress-bar
      :max-value="currentGame.totalQuestions"
      :value="currentGame.currentQuestionIndex"
      class="w-full"
    />
    <div class="p-6">
      <p class="text-center text-[1.6rem] leading-none">
        {{ currentGame.currentQuestionIndex + 1 }}.
        {{ currentQuestion.question }}
      </p>
      <div v-if="questionIsFlag">
        <div class="h-32 mx-auto my-8">
          <img
            :src="String(currentQuestion.item).replace('/static', '')"
            class="h-full mx-auto pointer-events-none object-fill"
          />
        </div>
      </div>
      <div v-else>
        <p
          class="text-center bg-quiz-blue-200 py-4 px-6 text-quiz-green-light text-[1.6rem] my-4"
        >
          {{ currentQuestion.item }}
        </p>
      </div>
      <quiz-input-text
        v-if="!gameIsMultipleChoice"
        :model.sync="selectedAnswer"
        placeholder="Digite sua resposta..."
        :disabled="answerIsCorrect"
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
      <div class="text-sm leading-none mt-2 h-4 text-right">
        <p v-if="answerIsSimilar" class="text-orange-400">
          Quase! Tente outra vez!
        </p>
        <p v-if="answerIsCorrect" class="text-quiz-green-light">
          Muito bem! Resposta correta!
        </p>
        <div v-if="answerIsIncorrect" class="flex items-center justify-between">
          <p class="text-red-400">Ops! Resposta errada!</p>
          <p v-if="!answerIsAFlag" class="text-quiz-green-light">
            Resposta correta: {{ correctAnswer }}
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <quiz-btn
          class="bg-quiz-pink text-quiz-white"
          :disabled="answerWasValidated && answerIsCorrect"
          @click="skipQuestion"
        >
          Pular
        </quiz-btn>
        <quiz-btn
          v-if="answerIsSimilar || answerIsIncorrect || !answerWasValidated"
          :disabled="!selectedAnswer"
          @click="sendSelectedAnswer"
        >
          Confirmar
        </quiz-btn>
        <quiz-btn v-if="answerIsCorrect" @click="acceptAnswer">
          Próximo
        </quiz-btn>
      </div>
    </div>
  </quiz-x-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { AnswerMode } from "~/enums/answerMode";
import { AnswerSimilarity } from "~/enums/answerSimilarity";
import { GeoQuizType } from "~/enums/geoQuizType";
import { Question } from "~/interfaces/Question";
import { useCurrentGame } from "~/store/currentGame";

const storeCurrentGame = useCurrentGame();
const { isFlag, currentGame } = storeToRefs(storeCurrentGame);

const selectedAnswer = ref<string>("");

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

const answerWasValidated = computed<boolean>(() => {
  return currentGame.value.answerSimilarity !== AnswerSimilarity.NotValidated;
});

const answerIsCorrect = computed<boolean>(() => {
  return currentGame.value.answerSimilarity === AnswerSimilarity.Equal;
});

const answerIsIncorrect = computed<boolean>(() => {
  return currentGame.value.answerSimilarity === AnswerSimilarity.NotSimilar;
});

const answerIsSimilar = computed<boolean>(() => {
  return currentGame.value.answerSimilarity === AnswerSimilarity.Similar;
});

const answerIsAFlag = computed<boolean>(() => {
  return (
    isFlag && currentGame.value.geoQuizType === GeoQuizType.FromStateCountry
  );
});

const correctAnswer = computed<any>(() => {
  const answer =
    currentGame.value.questions[currentGame.value.currentQuestionIndex]
      .correctAnswer;

  let fixedAnswer: any = answer;
  if (typeof answer === "object") {
    fixedAnswer = answer.map((item: string) => item).join(", ");
  }
  return fixedAnswer;
});

function selectAnswerHandler(answer: string) {
  selectedAnswer.value = answer;
}

function sendSelectedAnswer() {
  storeCurrentGame.validateAnswer(selectedAnswer.value);
}

function acceptAnswer() {
  storeCurrentGame.nextQuestion();
  selectedAnswer.value = "";
}

function skipQuestion() {
  storeCurrentGame.nextQuestion();
  selectedAnswer.value = "";
}
</script>

<style>
.selected-answer {
  box-shadow: 0 0 0 2px #59ff88;
  @apply text-quiz-green-light;
}
</style>
