<template>
  <quiz-page-layout class="pt-[10.5rem]">
    <div class="flex flex-col gap-2 items-center justify-center">
      <icon-quiz-alert class="w-8 h-8 text-quiz-pink" />
      <div>Página não encontrada ou não disponível!</div>
      <quiz-btn class="mt-4" @click="$router.push('/')">
        Voltar a página principal
      </quiz-btn>
    </div>
  </quiz-page-layout>
</template>

<script lang="ts" setup></script>
