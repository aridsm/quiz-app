<template>
  <div
    v-show="model"
    class="fixed top-0 left-0 bg-black/[.3] w-screen h-screen z-50 flex justify-center items-start sm:py-16 sm:px-4 overflow-auto"
    :class="{
      'items-start md:items-center': center,
    }"
    @click.self="closeModalHandler"
  >
    <quiz-x-card
      class="card-modal transition relative h-screen sm:h-auto w-screen rounded-none sm:rounded-md sm:w-auto"
      :class="{ ' border border-quiz-border': border }"
    >
      <slot />
      <button
        aria-label="Fechar"
        class="absolute right-[0.7rem] top-[0.7rem] transition text-quiz-grey-100 hover:text-quiz-blue p-3 lg:p-2"
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
  center?: boolean;
  border?: boolean;
}

withDefaults(defineProps<Props>(), {
  model: false,
  center: false,
  border: false,
});

const emit = defineEmits(["update:model"]);

function closeModalHandler() {
  emit("update:model", false);
}
</script>

<style>
.card-modal {
  animation: anima 0.1s ease-out forwards;
  box-shadow: 4px 4px 10px 0 rgba(13, 10, 31, 0.2);
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
