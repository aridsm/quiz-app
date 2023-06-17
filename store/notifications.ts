import { defineStore } from "pinia";
import { ref } from "vue";
import { NotificationType } from "~/enums/notificationType";
import { NotificationData } from "~/interfaces/NotificationData";

export const useNotifications = defineStore("useNotifications", () => {
  const notifications = ref<NotificationData[]>([
    {
      type: NotificationType.FriendRequest,
      confirm: undefined,
      friendRequestId: 4,
      seen: false,
      id: 1,
    },
  ]);

  return { notifications };
});
