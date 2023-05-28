<template>
  <div class="w-10 h-10 rounded-full overflow-hidden">
    <img
      class="object-cover block w-full h-full"
      :src="`/avatars/${avatar}.svg`"
      :alt="name"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  avatar: string;
  name?: string;
}

withDefaults(defineProps<Props>(), {
  avatar: undefined,
  name: "avatar",
});
</script>

<style></style>
