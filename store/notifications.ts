import { defineStore } from "pinia";
import { ref } from "vue";
import { NotificationType } from "~/enums/notificationType";
import { NotificationData } from "~/interfaces/NotificationData";

export const useNotifications = defineStore("useNotifications", () => {
  const notifications = ref<NotificationData[]>([
    {
      type: NotificationType.FriendRequest,
      friendRequestId: 4,
      friendName: "gabe817",
      id: 1,
    },
  ]);

  function deleteNotification(id: number) {
    notifications.value = notifications.value.filter(
      (notification: NotificationData) => notification.id !== id
    );
  }

  return { notifications, deleteNotification };
});
