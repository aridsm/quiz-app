<template>
  <div class="flex items-center">
    <div
      class="hidden sm:flex items-center text-quiz-blue gap-4 lg:gap-8 mr-4 lg:mr-8"
    >
      <div class="flex items-center">
        <span>{{ data.coinsCount }}</span>
        <icon-quiz-coins class="w-3 lg:w-4 ml-2" />
      </div>
      <div class="flex items-center">
        <span>{{ friendsCount }}</span>
        <icon-quiz-people class="w-4 lg:w-5 ml-2" />
      </div>
    </div>
    <quiz-toggle-activator :arrow-indicator="true" arrow-side="left">
      <template #activator>
        <quiz-x-avatar :avatar="data.avatarUrl" />
      </template>
      <template #content>
        <ul class="flex flex-col gap-1 sm:gap-2">
          <li v-for="option in profileOptions" :key="option.name">
            <button
              class="flex items-center hover:text-quiz-blue"
              :class="{
                'text-quiz-blue': option.id === ProfileOptions.Exit,
              }"
              @click="option.action"
            >
              {{ option.name }}
              <icon-quiz-exit
                v-if="option.id === ProfileOptions.Exit"
                class="h-3 md:h-4 ml-2 md:ml-3"
              />
            </button>
          </li>
        </ul>
      </template>
    </quiz-toggle-activator>
    <div class="hidden sm:flex flex-col gap-1 ml-3">
      <div
        class="flex flex-col lg:flex-row lg:items-center justify-between text-base"
      >
        <span class="leading-none">{{ data.userName }}</span>
        <span
          class="text-quiz-blue text-sm lg:text-base lg:text-inherit"
          :aria-label="`nível ${data.level}`"
        >
          LVL. {{ data.level }}
        </span>
      </div>
      <quiz-progress-bar
        class="hidden lg:block"
        :value="data.currentXp"
        :max-value="totalXpInCurrentLevel"
      />
    </div>
    <quiz-toggle-activator class="block md:hidden ml-4">
      <template #activator>
        <div class="relative p-2">
          <icon-quiz-menu class="w-4" />
        </div>
      </template>
      <template #content>
        <ul class="flex flex-col gap-1">
          <li>
            <nuxt-link to="/"> Home </nuxt-link>
          </li>
          <li>
            <span>Categorias</span>
            <ul class="flex flex-col gap-1 text-quiz-grey-100 ml-2">
              <li v-for="link in links" :key="link.name">
                <nuxt-link :to="link.route">
                  {{ link.name }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <button class="hover:text-quiz-blue" @click="openInfosModal">
              Sobre o projeto
            </button>
          </li>
        </ul>
      </template>
    </quiz-toggle-activator>
    <quiz-toggle-activator class="ml-3 lg:ml-8">
      <template #activator>
        <div class="relative p-2">
          <icon-quiz-bell class="w-3 md:w-4 text-quiz-blue" />
          <div
            v-if="notifications.length"
            class="w-2 h-2 bg-quiz-pink absolute top-1 right-0 rounded-full"
          />
        </div>
      </template>
      <template #content>
        <ul v-if="notifications.length" class="flex flex-col gap-2">
          <li
            v-for="notification in notifications"
            :key="notification.id"
            class="flex items-center"
          >
            <div
              v-if="notification.type === NotificationType.FriendRequest"
              class="flex items-center justify-between"
            >
              <p class="d max-w-max w-max mr-6">
                <span class="text-quiz-blue">{{
                  notification.friendName
                }}</span>
                quer ser seu amigo!
              </p>
              <div class="flex items-center gap-4">
                <button
                  aria-label="Rejeitar"
                  @click="() => deleteNotification(notification.id)"
                >
                  <icon-quiz-xmark class="w-5 text-quiz-pink" />
                </button>
                <button
                  aria-label="Aceitar"
                  @click="() => acceptFriend(notification)"
                >
                  <icon-quiz-checkmark class="w-5 text-quiz-blue" />
                </button>
              </div>
            </div>
            <div v-else>
              {{ notification.message }}
            </div>
          </li>
        </ul>
        <p v-else>Não há nada aqui!</p>
      </template>
    </quiz-toggle-activator>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "@nuxtjs/composition-api";
import { ProfileOptions } from "../../enums/profileOptions";
import { useNotifications } from "~/store/notifications";
import { useModals } from "~/store/modals";
import { useUserDataStore } from "~/store/userData";
import { NotificationType } from "~/enums/notificationType";
import { useFriends } from "~/store/friends";

interface Options {
  action: Function;
  name: string;
  id: number;
}

const userStore = useUserDataStore();
const useModalStore = useModals();
const notificationsStore = useNotifications();
const friendsStore = useFriends();
const router = useRouter();

const { data, totalXpInCurrentLevel, friendsCount } = storeToRefs(userStore);
const { notifications } = storeToRefs(notificationsStore);

const profileOptions = ref<Options[]>([
  {
    action: showProfile,
    name: "Seu perfil",
    id: ProfileOptions.Profile,
  },
  {
    action: showFriend,
    name: "Amigos",
    id: ProfileOptions.Friends,
  },
  {
    action: showHistory,
    name: "Seu histórico",
    id: ProfileOptions.History,
  },
  {
    action: logout,
    name: "Sair",
    id: ProfileOptions.Exit,
  },
]);

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

function showProfile() {
  useModalStore.modals.modalProfile.isOpen = true;
  useModalStore.modals.modalProfile.tabActived = ProfileOptions.Profile;
}

function showFriend() {
  useModalStore.modals.modalProfile.isOpen = true;
  useModalStore.modals.modalProfile.tabActived = ProfileOptions.Friends;
}

function showHistory() {
  useModalStore.modals.modalProfile.isOpen = true;
  useModalStore.modals.modalProfile.tabActived = ProfileOptions.History;
}

function openInfosModal() {
  useModalStore.modals.modalInfosIsOpen = true;
}

function logout() {
  userStore.logout();
  router.push("/login");
}

function deleteNotification(id: number) {
  notificationsStore.deleteNotification(id);
}

function acceptFriend({ id, friendRequestId }: any) {
  if (friendRequestId) {
    friendsStore.addNewFriend(friendRequestId);
    deleteNotification(id);
  }
}
</script>
