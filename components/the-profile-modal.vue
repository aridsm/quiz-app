<template>
  <quiz-modal-overlay :model.sync="modals.modalProfileIsOpen">
    <div style="width: 32rem">
      <div class="flex items-center gap-5">
        <div class="w-36 h-36 rounded-md overflow-hidden">
          <img
            :src="`/avatars/${user.avatarUrl}.svg`"
            :alt="user.userName"
            class="h-full w-full block object-cover"
          />
        </div>
        <div>
          <p class="leading-none">{{ user.userName }}</p>
          <button class="text-quiz-blue-100 text-base">
            Editar nome de usuário
          </button>

          <div class="mt-2">
            <span class="text-quiz-green-light text-base">
              Nível {{ user.level }}
            </span>
            <p class="text-base">25XP para o próximo nível</p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex h-12">
          <button
            v-for="option in profileOptions"
            :key="option.id"
            class="h-full px-4 rounded-t-md"
            :class="{
              'bg-quiz-blue-200 text-quiz-green-light':
                option.tab === tabSelected,
            }"
            @click="() => selectOption(option.tab)"
          >
            {{ option.name }}
          </button>
        </div>
        <component :is="tabSelected" />
      </div>
    </div>
  </quiz-modal-overlay>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { ProfileOptions } from "~/enums/profileOptions";
import { useModals } from "~/store/modals";
import { useUserDataStore } from "~/store/userData";

const storeModals = useModals();
const { modals } = storeToRefs(storeModals);

const storeUserData = useUserDataStore();
const { data: user } = storeToRefs(storeUserData);

interface Options {
  name: string;
  id: ProfileOptions;
  tab: string;
}

const profileOptions = ref<Options[]>([
  {
    name: "Progresso",
    id: ProfileOptions.Profile,
    tab: "profile-tab-progress",
  },
  {
    name: "Amigos",
    id: ProfileOptions.Friends,
    tab: "profile-tab-friends",
  },
  {
    name: "Histórico",
    id: ProfileOptions.History,
    tab: "profile-tab-history",
  },
]);

const tabSelected = ref(profileOptions.value[0].tab);

function selectOption(tab: string) {
  tabSelected.value = tab;
}
</script>
