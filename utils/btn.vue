<template>
  <button
    type="button"
    class="w-fit inline-block overflow-hidden relative rounded-md bg-quiz-green-light cursor-pointer text-quiz-green-dark hover:text-quiz-white btn"
    @click="$emit('click')"
  >
    <div class="absolute transition bg-quiz-pink w-0 h-full hover-bg" />
    <div class="py-3 px-7 z-10 relative">
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
.btn:hover .hover-bg {
  @apply w-full;
  transition: all 0.1s ease-in-out;
}

.btn .hover-bg {
  transition: all 0.1s ease-in-out;
}
</style>
