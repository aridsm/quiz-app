<template>
  <div class="flex flex-col h-screen">
    <header class="h-[5.5rem] flex justify-center items-center text-2xl">
      <div class="flex justify-center items-center gap-2">
        <img src="/shapes/square-green.svg" class="w-4" />
        <span>Quiz</span>
      </div>
    </header>
    <quiz-page-layout class="flex-1" style="min-height: auto">
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <div
      class="w-80 h-80 bg-quiz-blue-100 fixed -top-28 bg-blur pointer-events-none"
    />
    <the-tooltip />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.bg-blur {
  left: calc(50% - 9rem);
  z-index: 99;
  filter: blur(260px);
}
</style>
