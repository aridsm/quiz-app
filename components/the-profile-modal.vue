<template>
  <quiz-modal-overlay :model.sync="modals.modalProfile.isOpen">
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
          <button
            class="text-quiz-grey-100 text-base hover:text-quiz-blue"
            @click="openModalUsername"
          >
            Editar nome de usuário
          </button>

          <div class="mt-2">
            <span class="text-quiz-blue text-base">
              Nível {{ user.level }}
            </span>
            <p class="text-base">
              {{ totalXpInCurrentLevel - user.currentXp }} XP para o próximo
              nível
            </p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex h-12">
          <button
            v-for="option in profileOptions"
            :key="option.id"
            class="h-full px-6 rounded-t-md ml-3 hover:text-quiz-blue border-2 border-b-0 border-quiz-border"
            :class="{
              'bg-quiz-grey-400 text-quiz-blue': option.id === tabSelected,
            }"
            @click="() => selectOption(option.id)"
          >
            {{ option.name }}
          </button>
        </div>
        <component :is="tabComponentSelected" />
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
            <p class="mb-3">Avatares disponíveis</p>
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

      <quiz-modal-overlay
        style="width: 100%; height: 100%; background: transparent"
        :model.sync="modalUsernameIsOpen"
      >
        <div class="flex flex-col">
          <p class="mb-4 text-quiz-white">
            Escolha um nome de usuário

            <button
              v-title="
                'De 3 a 10 caracteres, apenas letras, números e os símbolos _ @ ou !'
              "
              aria-label="De 3 a 10 caracteres, apenas letras, números e os símbolos _ @ ou !"
              class="hover:text-quiz-blue text-quiz-grey-100 ml-2"
            >
              <icon-quiz-infos class="w-4" />
            </button>
          </p>
          <quiz-input-text
            :model.sync="newUserValue"
            class="py-3 text-base"
            style="width: 20rem"
          />
          <p v-if="newUsernameIsInvalid" class="mt-1 text-quiz-pink text-sm">
            {{ errorNewUsername }}
          </p>
          <quiz-btn class="mt-4 w-full" @click="changeUsername">
            Confirmar
          </quiz-btn>
        </div>
      </quiz-modal-overlay>
    </div>
  </quiz-modal-overlay>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { ProfileOptions } from "~/enums/profileOptions";
import { useModals } from "~/store/modals";
import { useUserDataStore } from "~/store/userData";
import avatarList from "~/utilities/avatarsList";

const storeModals = useModals();
const { modals } = storeToRefs(storeModals);

const storeUserData = useUserDataStore();
const {
  data: user,
  friendsCount,
  totalXpInCurrentLevel,
} = storeToRefs(storeUserData);

const modalAvatarImagesIsOpen = ref<boolean>(false);
const imageSelected = ref<string>("");

const modalUsernameIsOpen = ref<boolean>(false);
const newUsernameIsInvalid = ref<boolean>(false);
const newUserValue = ref<string>("");

const errorNewUsername = ref<string>("");

interface Options {
  name: string;
  id: ProfileOptions;
  tab: string;
}

const avatarImages = avatarList;

const profileOptions = computed<Options[]>(() => {
  return [
    {
      name: "Progresso",
      id: ProfileOptions.Profile,
      tab: "profile-tab-progress",
    },
    {
      name: `Amigos (${friendsCount.value})`,
      id: ProfileOptions.Friends,
      tab: "profile-tab-friends",
    },
    {
      name: "Histórico",
      id: ProfileOptions.History,
      tab: "profile-tab-history",
    },
  ];
});

const tabSelected = ref(modals.value.modalProfile.tabActived);

watch(
  () => modals.value.modalProfile.tabActived,
  () => {
    tabSelected.value = modals.value.modalProfile.tabActived;
  }
);

const tabComponentSelected = computed(() => {
  const tab = profileOptions.value.find(
    (option: Options) => option.id === tabSelected.value
  );

  return tab?.tab || "profile-tab-progress";
});

function selectOption(id: ProfileOptions) {
  tabSelected.value = id;
}

function openAvatarImagesOptions() {
  modalAvatarImagesIsOpen.value = true;
  imageSelected.value = user.value.avatarUrl;
}

function changeProfileAvatar() {
  user.value.avatarUrl = imageSelected.value;
  modalAvatarImagesIsOpen.value = false;
}

function openModalUsername() {
  newUserValue.value = user.value.userName;
  modalUsernameIsOpen.value = true;
  newUsernameIsInvalid.value = false;
}

function changeUsername() {
  const { isValid, messageError } = storeUserData.login(newUserValue.value);
  errorNewUsername.value = messageError;

  if (isValid) {
    modalUsernameIsOpen.value = false;
  } else {
    newUsernameIsInvalid.value = true;
  }
}
</script>
