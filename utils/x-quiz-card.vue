<template>
  <quiz-x-card
    class="quiz-card p-3 md:p-6 relative cursor-pointer overflow-hidden transition hover:bg-quiz-grey-200 h-28 md:h-36 lg:h-48 flex flex-col justify-center items-center"
    @click.native="openModalGameSettings"
  >
    <div>
      <p
        class="lg:text-[1.6rem] leading-snug table text-center md:text-left max-w-[150px] md:max-w-[200px]"
      >
        {{ quiz.name }}
      </p>
      <span
        class="play-now-link hidden md:flex scale-y-0 h-0 overflow-hidden transition text-quiz-blue text-left items-center justify-start"
      >
        Jogar agora
        <icon-quiz-arrow class="w-[10px] ml-1 text-quiz-blue -rotate-90" />
      </span>
    </div>
    <quiz-x-chip v-if="chip" class="absolute top-0 right-0" :color="chip.color">
      {{ chip.chipName }}
    </quiz-x-chip>
  </quiz-x-card>
</template>

<script lang="ts" setup>
import { ChipColors } from "~/enums/chipColors";
import { Quiz } from "~/interfaces/Quiz";
import { useGameSettings } from "~/store/gameSettings";

interface Props {
  quiz: Quiz;
  chip?: {
    color: ChipColors;
    chipName: string;
  };
}

const props = defineProps<Props>();

const storeGameSettings = useGameSettings();

function openModalGameSettings() {
  storeGameSettings.openModalGameSettings(props.quiz);
}
</script>

<style scoped>
.quiz-card:hover {
  box-shadow: 0 0 0 2px #4ed7f5, 4px 4px 10px 0 rgba(13, 10, 31, 0.2);
}

.quiz-card:hover .play-now-link {
  @apply scale-y-100 h-auto;
}
</style>
