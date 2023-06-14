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
      <game-question-section
        :current-question="currentQuestion"
        :current-game="currentGame"
        :is-flag="isFlag"
      />
      <quiz-input-text
        v-if="!gameIsMultipleChoice"
        :model.sync="selectedAnswer"
        placeholder="Digite sua resposta..."
        :readonly="answerIsCorrect || answerIsIncorrect"
        class="w-full"
        @pressenter="
          () => {
            return answerIsSimilar || !answerWasValidated
              ? sendSelectedAnswer()
              : nextQuestion();
          }
        "
      />
      <game-item-choice-text
        v-if="!answerIsAFlag && gameIsMultipleChoice"
        :current-question="currentQuestion"
        :select-answer-handler="selectAnswerHandler"
        :disabled="answerIsCorrect || answerIsIncorrect"
        :selected-answer="selectedAnswer"
        :correct-answer="correctAnswer"
      />
      <game-item-choice-img
        v-if="answerIsAFlag && gameIsMultipleChoice"
        :current-question="currentQuestion"
        :select-answer-handler="selectAnswerHandler"
        :disabled="answerIsCorrect || answerIsIncorrect"
        :selected-answer="selectedAnswer"
      />
      <div class="text-sm leading-none mt-3 h-4 text-right tracking-wide">
        <p v-if="answerIsSimilar" class="text-orange-400">
          Quase! Tente outra vez!
        </p>
        <p
          v-if="answerIsCorrect"
          class="text-quiz-green-light flex items-center justify-between"
        >
          Muito bem! Resposta correta!
          <span v-if="correctAnswersIsMoreThanOne">
            Todas: {{ correctAnswer }}
          </span>
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

const correctAnswersIsMoreThanOne = computed<any>(() => {
  const answer =
    currentGame.value.questions[currentGame.value.currentQuestionIndex]
      .correctAnswer;
  if (typeof answer === "object" && answer.length > 1) {
    return true;
  }
  return false;
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
  if (!selectedAnswer.value) {
    return;
  }
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
