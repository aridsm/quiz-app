<template>
  <button
    type="button"
    class="button w-fit active:scale-95 hover:bg-quiz-blue-hover active:bg-quiz-blue-active inline-block overflow-hidden rounded-md transition cursor-pointer text-quiz-blue-dark bg-quiz-blue"
    @click="$emit('click')"
  >
    <div class="py-2 md:py-3 px-3 md:px-7 z-10">
      <slot />
    </div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "QuizBtn",
});
</script>

<style scoped>
.button:disabled {
  @apply bg-quiz-grey-200 text-quiz-grey-100 cursor-not-allowed active:scale-100;
}
</style>
