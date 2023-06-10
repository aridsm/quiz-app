<template>
  <div>
    <p
      class="text-center text-[1.6rem] leading-none"
      :class="{
        'bg-quiz-blue-200 py-4 px-6 mb-8 leading-snug': !categoryIsGeography,
      }"
    >
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

    <div v-else-if="!questionIsFlag && categoryIsGeography">
      <p
        class="text-center bg-quiz-blue-200 py-4 px-6 text-quiz-green-light text-[1.6rem] my-4"
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

const itemQuestion = computed<string | number | string[]>(() => {
  console.log(categoryIsGeography);
  const currentGameQuestion: any = props.currentQuestion.item;
  let fixedQuestion: any = currentGameQuestion;
  if (typeof currentGameQuestion === "object") {
    fixedQuestion = fixedQuestion.map((item: string) => item).join(", ");
  }
  return fixedQuestion;
});
</script>

<style></style>
