<template>
  <div class="flex items-center">
    <div class="flex items-center text-quiz-blue gap-8 mr-8">
      <div class="flex items-center">
        <span>{{ data.coinsCount }}</span>
        <icon-quiz-coins class="w-4 ml-2" />
      </div>
      <div class="flex items-center">
        <span>{{ friendsCount }}</span>
        <icon-quiz-people class="w-5 ml-2" />
      </div>
    </div>
    <quiz-toggle-activator :arrow-indicator="true" arrow-side="left">
      <template #activator>
        <quiz-x-avatar :avatar="data.avatarUrl" />
      </template>
      <template #content>
        <ul class="flex flex-col gap-2">
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
                class="w-4 ml-3 -mt-[3px]"
              />
            </button>
          </li>
        </ul>
      </template>
    </quiz-toggle-activator>
    <div class="flex flex-col gap-1 ml-3">
      <div class="flex items-center justify-between text-base">
        <span>{{ data.userName }}</span>
        <span :aria-label="`nível ${data.level}`">LVL. {{ data.level }}</span>
      </div>
      <quiz-progress-bar
        :value="data.currentXp"
        :max-value="totalXpInCurrentLevel"
      />
    </div>
    <quiz-toggle-activator class="ml-8">
      <template #activator>
        <div class="relative">
          <icon-quiz-bell class="w-4 text-quiz-blue" />
          <div
            v-if="notifications.length"
            class="w-2 h-2 bg-quiz-pink absolute left-full -top-1 rounded-full"
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
