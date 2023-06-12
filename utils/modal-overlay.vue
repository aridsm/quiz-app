<template>
  <div
    v-show="model"
    class="fixed top-0 left-0 bg-black/[.3] w-screen h-screen z-50 flex justify-center items-center"
    @click.self="closeModalHandler"
  >
    <quiz-x-card class="card-modal transition relative">
      <slot />
      <button
        class="absolute right-[0.7rem] top-[0.7rem] transition text-quiz-blue-100 hover:text-quiz-green-light p-2"
        @click="closeModalHandler"
      >
        <icon-quiz-xmark-raw class="w-5" />
      </button>
    </quiz-x-card>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  model: boolean;
}

withDefaults(defineProps<Props>(), {
  model: false,
});

const emit = defineEmits(["update:model"]);

function closeModalHandler() {
  emit("update:model", false);
}
</script>

<style>
.card-modal {
  animation: anima 0.1s ease-out forwards;
  box-shadow: 4px 4px 10px 0 rgba(32, 25, 78, 0.3);
}

@keyframes anima {
  from {
    transform: translateY(-1rem);
  }
  to {
    transform: translateY(0);
  }
}
</style>
