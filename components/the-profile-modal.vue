<template>
  <quiz-modal-overlay :model.sync="modals.modalProfileIsOpen">
    <div style="width: 38rem" class="relative">
      <div class="flex items-center gap-5">
        <div class="w-36 h-36 rounded-md relative">
          <img
            :src="`/avatars/${user.avatarUrl}.svg`"
            :alt="user.userName"
            class="h-full w-full block object-cover rounded-md"
          />
          <button
            aria-label="editar foto de perfil"
            class="w-full absolute h-full rounded-md bg-black/[.5] top-0 left-0 flex justify-center items-center p-4 transition opacity-0 hover:opacity-100"
            @click="openAvatarImagesOptions"
          >
            Editar foto de perfil
          </button>
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
            class="h-full px-6 rounded-t-md hover:text-quiz-green-light"
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

      <quiz-modal-overlay
        style="width: 100%; height: 100%; background: transparent"
        :model.sync="modalAvatarImagesIsOpen"
      >
        <div class="flex gap-6">
          <div class="flex flex-col">
            <div class="w-36 h-36 rounded-md relative">
              <img
                :src="`/avatars/${imageSelected}.svg`"
                :alt="imageSelected"
                class="h-full w-full block object-cover rounded-md"
              />
            </div>
            <quiz-btn class="mt-auto w-full" @click="changeProfileAvatar">
              Confirmar
            </quiz-btn>
          </div>
          <div>
            <p class="mb-3 text-quiz-blue-100">Avatares disponíveis</p>
            <ul class="grid-cols-5 grid gap-4">
              <li
                v-for="avatar in avatarImages"
                :key="avatar"
                class="cursor-pointer"
                @click="imageSelected = avatar"
              >
                <div class="w-14 h-14 rounded-sm relative">
                  <img
                    :src="`/avatars/${avatar}.svg`"
                    :alt="avatar"
                    class="h-full w-full block object-cover rounded-md"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </quiz-modal-overlay>
    </div>
  </quiz-modal-overlay>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { ProfileOptions } from "~/enums/profileOptions";
import { useModals } from "~/store/modals";
import { useUserDataStore } from "~/store/userData";
import avatarList from "~/utilities/avatarsList";

const storeModals = useModals();
const { modals } = storeToRefs(storeModals);

const storeUserData = useUserDataStore();
const { data: user } = storeToRefs(storeUserData);

const modalAvatarImagesIsOpen = ref<boolean>(false);
const imageSelected = ref<string>("");

interface Options {
  name: string;
  id: ProfileOptions;
  tab: string;
}

const avatarImages = avatarList;

const profileOptions = ref<Options[]>([
  {
    name: "Progresso",
    id: ProfileOptions.Profile,
    tab: "profile-tab-progress",
  },
  {
    name: `Amigos (${user.value.friendsCount})`,
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

function openAvatarImagesOptions() {
  modalAvatarImagesIsOpen.value = true;
  imageSelected.value = user.value.avatarUrl;
}

function changeProfileAvatar() {
  user.value.avatarUrl = imageSelected.value;
  modalAvatarImagesIsOpen.value = false;
}
</script>
