<template>
  <quiz-x-card
    class="col-span-2 w-full relative overflow-hidden quiz-card-choices"
  >
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
        <div class="h-28 mx-auto my-6">
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
          {{ itemQuestion }}
        </p>
      </div>
      <quiz-input-text
        v-if="!gameIsMultipleChoice"
        :model.sync="selectedAnswer"
        placeholder="Digite sua resposta..."
        :disabled="answerIsCorrect || answerIsIncorrect"
        class="w-full"
      />
      <game-item-choice-text
        v-if="!answerIsAFlag && gameIsMultipleChoice"
        :current-question="currentQuestion"
        :select-answer-handler="selectAnswerHandler"
        :disabled="answerIsCorrect || answerIsIncorrect"
        :selected-answer="selectedAnswer"
      />
      <game-item-choice-img
        v-if="answerIsAFlag && gameIsMultipleChoice"
        :current-question="currentQuestion"
        :select-answer-handler="selectAnswerHandler"
        :disabled="answerIsCorrect || answerIsIncorrect"
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
          <p class="text-quiz-pink">Ops! Resposta errada!</p>
          <p v-if="!answerIsAFlag" class="text-quiz-green-light">
            Resposta correta: {{ correctAnswer }}
          </p>
          <p v-else class="text-quiz-green-light">
            Resposta correta: item "{{ correctItemChoice }}"
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <quiz-btn
          class="bg-quiz-pink text-quiz-white"
          :disabled="
            (answerWasValidated && answerIsCorrect) || !currentGame.skipChances
          "
          @click="nextQuestion"
        >
          Pular
        </quiz-btn>
        <quiz-btn
          v-if="answerIsSimilar || !answerWasValidated"
          :disabled="!selectedAnswer"
          @click="sendSelectedAnswer"
        >
          Confirmar
        </quiz-btn>
        <quiz-btn
          v-if="answerIsCorrect || answerIsIncorrect"
          @click="nextQuestion"
        >
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
import getItemsOrderLetter from "~/utilities/getMultipleChoiceLetter";

const storeCurrentGame = useCurrentGame();
const { isFlag, currentGame } = storeToRefs(storeCurrentGame);

const selectedAnswer = ref<string>("");

const guessFromFlagOrCapital = computed<boolean>(() => {
  return currentGame.value.geoQuizType === GeoQuizType.FromFlagCapital;
});

const questionIsFlag = computed<boolean>(() => {
  return guessFromFlagOrCapital.value && isFlag.value;
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
    isFlag.value &&
    currentGame.value.geoQuizType === GeoQuizType.FromStateCountry
  );
});

const itemQuestion = computed<string | number | string[]>(() => {
  const currentGameQuestion: any = currentQuestion.value.item;
  let fixedQuestion: any = currentGameQuestion;
  if (typeof currentGameQuestion === "object") {
    fixedQuestion = fixedQuestion.map((item: string) => item).join(", ");
  }
  return fixedQuestion;
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

const correctItemChoice = computed<string>(() => {
  const possibleAnswers =
    currentGame.value.questions[currentGame.value.currentQuestionIndex]
      .otherAnswers;

  const correctAnswerPosition: any = possibleAnswers.indexOf(
    correctAnswer.value as never
  );

  return getItemsOrderLetter(correctAnswerPosition);
});

function selectAnswerHandler(answer: string) {
  selectedAnswer.value = answer;
}

function sendSelectedAnswer() {
  storeCurrentGame.validateAnswer(selectedAnswer.value);
}

function nextQuestion() {
  storeCurrentGame.nextQuestion();
  selectedAnswer.value = "";
}
</script>

<style>
.selected-answer {
  box-shadow: 0 0 0 2px #59ff88;
  @apply text-quiz-green-light;
}

.quiz-card-choices {
  padding: 0 !important;
}
</style>
