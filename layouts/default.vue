<template>
  <div class="relative">
    <the-header />
    <quiz-page-layout class="pt-[9.5rem]">
      <nuxt />
    </quiz-page-layout>
    <the-footer />
    <the-friends-modal />
    <div
      class="w-72 h-72 bg-quiz-blue-100 fixed -top-28 bg-blur pointer-events-none"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.bg-blur {
  left: calc(50% - 9rem);
  z-index: 99;
  filter: blur(250px);
}
</style>
