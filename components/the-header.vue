<template>
  <header
    class="fixed w-full bg-quiz-grey-300 border-b-2 border-quiz-border z-50 the-header"
  >
    <div
      class="max-w-[1340px] w-full mx-auto h-[4.5rem] lg:h-[5.5rem] flex items-center px-5"
    >
      <div class="flex items-center gap-5 lg:gap-8">
        <h1 class="text-2xl md:mr-2">
          <nuxt-link to="/">
            <the-logo />
          </nuxt-link>
        </h1>
        <nav class="nav-header hidden md:block">
          <ul class="flex gap-6 lg:gap-10">
            <li>
              <nuxt-link to="/" class="hover:text-quiz-blue"> Home </nuxt-link>
            </li>
            <li>
              <quiz-toggle-activator
                :arrow-indicator="true"
                hover-class="text-quiz-blue"
              >
                <template #activator>
                  <span
                    :class="{
                      'text-quiz-blue': $route.fullPath?.includes('quizzes'),
                    }"
                  >
                    Categorias
                  </span>
                </template>
                <template #content>
                  <ul class="flex flex-col gap-2">
                    <li v-for="link in links" :key="link.name">
                      <nuxt-link :to="link.route" class="hover:text-quiz-blue">
                        {{ link.name }}
                      </nuxt-link>
                    </li>
                  </ul>
                </template>
              </quiz-toggle-activator>
            </li>
            <li>
              <button class="hover:text-quiz-blue" @click="openInfosModal">
                Sobre o projeto
              </button>
            </li>
          </ul>
        </nav>
        <button
          aria-label="Abrir barra de pesquisa"
          class="hover:text-quiz-blue p-2"
          @click="openSearchModal"
        >
          <icon-quiz-search class="w-[14px] md:w-4" />
        </button>
      </div>
      <header-user-data class="ml-auto" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useModals } from "~/store/modals";

interface Link {
  route: string;
  name: string;
}

const storeModals = useModals();

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

function openSearchModal() {
  storeModals.modals.modalSearchIsOpen = true;
}

function openInfosModal() {
  storeModals.modals.modalInfosIsOpen = true;
}
</script>

<style scoped>
.nav-header .nuxt-link-exact-active {
  @apply text-quiz-blue;
}

.the-header {
  box-shadow: 0 4px 15px 0 rgba(13, 10, 31, 0.2);
}
</style>
