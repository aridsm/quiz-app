<template>
  <button
    type="button"
    class="button w-fit active:scale-95 inline-block overflow-hidden rounded-md transition cursor-pointer text-quiz-green-dark bg-quiz-green-light"
    @click="$emit('click')"
  >
    <div class="py-3 px-7 z-10">
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
  @apply bg-quiz-blue-200 text-quiz-blue-100 cursor-not-allowed active:scale-100;
}
</style>
