<template>
  <header
    class="fixed w-full bg-quiz-blue-400 border-b-2 border-quiz-blue-300 z-50"
  >
    <div
      class="max-w-[1280px] w-full mx-auto h-[5.5rem] flex items-center px-4"
    >
      <div class="flex items-center gap-10">
        <h1 class="text-2xl"><nuxt-link to="/">Quiz</nuxt-link></h1>
        <nav class="nav-header">
          <ul class="flex gap-12">
            <li>
              <nuxt-link to="/" class="hover:text-quiz-green-light">
                Home
              </nuxt-link>
            </li>
            <li>
              <quiz-toggle-activator
                :arrow-indicator="true"
                hover-class="text-quiz-green-light"
              >
                <template #activator>Categorias</template>
                <template #content>
                  <ul class="flex flex-col gap-2">
                    <li v-for="link in links" :key="link.name">
                      <nuxt-link
                        :to="link.route"
                        class="hover:text-quiz-green-light"
                      >
                        {{ link.name }}
                      </nuxt-link>
                    </li>
                  </ul>
                </template>
              </quiz-toggle-activator>
            </li>
            <li>
              <button class="hover:text-quiz-green-light">Jogar agora</button>
            </li>
          </ul>
        </nav>
        <button class="hover:text-quiz-green-light">
          <icon-quiz-search class="w-4" />
        </button>
      </div>
      <header-user-data class="ml-auto" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Link {
  route: string;
  name: string;
}

const links = ref<Link[]>([
  {
    route: "/quizzes/biology",
    name: "Biologia",
  },
  {
    route: "/quizzes/geography",
    name: "Geografia",
  },
  {
    route: "/quizzes/mathematics",
    name: "Matemática",
  },
  {
    route: "/quizzes",
    name: "Todas as categorias",
  },
]);
</script>

<style scoped>
.nav-header .nuxt-link-exact-active {
  @apply text-quiz-green-light;
}
</style>
