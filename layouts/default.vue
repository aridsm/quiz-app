<template>
  <div class="relative">
    <the-header />
    <quiz-page-layout class="pt-[9.5rem]">
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <the-profile-modal />
    <the-game-settings-modal />
    <div class="fixed bottom-4 right-4">
      <button class="flex items-center gap-2">
        <span class="text-sm text-quiz-green-light">Sair</span>
        <div class="bg-quiz-green-light rounded-md p-2">
          <icon-quiz-exit class="w-4 text-quiz-green-dark" />
        </div>
      </button>
    </div>
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
  filter: blur(280px);
}
</style>
