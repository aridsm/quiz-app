<template>
  <div
    v-if="model"
    class="fixed top-0 left-0 bg-black/[.3] w-screen h-screen z-50 flex justify-center items-center"
    @click="closeModalHandler"
  >
    <quiz-card>
      <slot />
    </quiz-card>
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

<style></style>
