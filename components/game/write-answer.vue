<template>
  <quiz-input-text
    :model.sync="inputAnswer"
    placeholder="Digite sua resposta..."
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const inputAnswer = ref<string>("");
</script>
