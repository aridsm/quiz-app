<template>
  <div class="flex flex-col">
    <header class="h-[5.5rem] flex justify-center items-center text-2xl">
      Quiz
    </header>
    <quiz-page-layout>
      <nuxt />
    </quiz-page-layout>
    <the-footer />

    <div
      class="w-80 h-80 bg-quiz-blue-100 fixed -top-28 bg-blur pointer-events-none"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.bg-blur {
  left: calc(50% - 9rem);
  z-index: 99;
  filter: blur(280px);
}
</style>
