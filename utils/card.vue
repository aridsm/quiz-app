<template>
  <div
    class="w-fit p-4 rounded-md bg-quiz-blue-300 border border-quiz-border inline-block"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "QuizCard",
});
</script>
