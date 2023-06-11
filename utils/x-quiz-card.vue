<template>
  <quiz-x-card
    class="quiz-card p-6 relative cursor-pointer overflow-hidden transition hover:bg-quiz-blue-200 h-48 flex flex-col justify-center items-center"
    @click.native="openModalGameSettings"
  >
    <div>
      <p class="text-[1.6rem] leading-snug table max-w-[200px]">
        {{ quiz.name }}
      </p>
      <span
        class="play-now-link scale-y-0 h-0 overflow-hidden transition text-quiz-green-light text-left flex items-center justify-start"
      >
        Jogar agora
        <icon-quiz-arrow
          class="h-4 w-4 text-quiz-green-light -rotate-90 -mt-[1px]"
        />
      </span>
    </div>
    <quiz-x-chip v-if="chip" class="absolute top-0 right-0" :color="chip.color">
      {{ chip.chipName }}
    </quiz-x-chip>
  </quiz-x-card>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ChipColors } from "~/enums/chipColors";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { Quiz } from "~/interfaces/Quiz";
import { useGameSettings } from "~/store/gameSettings";
import { useModals } from "~/store/modals";

interface Props {
  quiz: Quiz;
  chip?: {
    color: ChipColors;
    chipName: string;
  };
}

const props = defineProps<Props>();

const storeModals = useModals();
const storeGameSettings = useGameSettings();

const { gameSettings } = storeToRefs(storeGameSettings);

function openModalGameSettings() {
  gameSettings.value.category = props.quiz.category;
  gameSettings.value.quizId = props.quiz.id;
  gameSettings.value.quizName = props.quiz.name;
  gameSettings.value.acceptAnswerMode = props.quiz.acceptAnswerMode;
  gameSettings.value.geoQuizType =
    props.quiz.category === QuizCategoryType.Geography
      ? GeoQuizType.FromFlagCapital
      : null;
  gameSettings.value.countdown = false;
  storeModals.modals.modalGameSettingsIsOpen = true;
}
</script>

<style scoped>
.quiz-card:hover {
  box-shadow: 0 0 0 2px #59ff88, 4px 4px 10px 0 rgba(32, 25, 78, 0.3);
}

.quiz-card:hover .play-now-link {
  @apply scale-y-100 h-auto;
}
</style>
