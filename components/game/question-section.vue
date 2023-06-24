<template>
  <div>
    <div
      class="text-center text-base md:text-xl lg:text-[1.6rem] leading-none"
      :class="{
        'bg-quiz-grey-400 py-4 px-3 md:px-6 mb-3 md:mb-7 leading-snug tracking-wide rounded-md':
          !categoryIsGeography,
      }"
    >
      {{ currentGame.currentQuestionIndex + 1 }}.
      {{ currentQuestion.question }}
      <p
        v-if="categoryIsMath && currentQuestion.item"
        class="mt-3 text-quiz-blue"
      >
        {{ currentQuestion.item }}
      </p>
    </div>

    <div v-if="questionIsFlag">
      <div class="h-20 md:h-28 mx-auto my-4 md:my-6">
        <img
          :src="String(currentQuestion.item).replace('/static', '')"
          class="h-full mx-auto pointer-events-none object-fill"
        />
      </div>
    </div>

    <div v-else-if="!questionIsFlag && categoryIsGeography">
      <p
        class="text-center bg-quiz-grey-400 rounded-md py-2 md:py-3 px-3 md:px-6 text-quiz-blue text-base md:text-xl lg:text-[1.6rem] my-3"
      >
        {{ itemQuestion }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { CurrentGame } from "~/interfaces/CurrentGame";
import { Question } from "~/interfaces/Question";

interface Props {
  currentQuestion: Question;
  currentGame: CurrentGame;
  isFlag: boolean;
}

const props = defineProps<Props>();

const guessFromFlagOrCapital = computed<boolean>(() => {
  return props.currentGame.geoQuizType === GeoQuizType.FromFlagCapital;
});

const questionIsFlag = computed<boolean>(() => {
  return guessFromFlagOrCapital.value && props.isFlag;
});

const categoryIsGeography = computed<boolean>(() => {
  return props.currentGame.category === QuizCategoryType.Geography;
});

const categoryIsMath = computed<boolean>(() => {
  return props.currentGame.category === QuizCategoryType.Mathematics;
});

const itemQuestion = computed<string | number | string[]>(() => {
  const currentGameQuestion: any = props.currentQuestion.item;
  let fixedQuestion: any = currentGameQuestion;
  if (typeof currentGameQuestion === "object") {
    fixedQuestion = fixedQuestion.map((item: string) => item).join(", ");
  }
  return fixedQuestion;
});
</script>

<style></style>
