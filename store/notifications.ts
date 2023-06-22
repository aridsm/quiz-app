import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { NotificationType } from "~/enums/notificationType";
import { NotificationData } from "~/interfaces/NotificationData";
import getLocalStorageItem from "~/utilities/getLocalStorageItem";

export const useNotifications = defineStore("useNotifications", () => {
  const notifications = ref<NotificationData[]>([
    {
      type: NotificationType.FriendRequest,
      friendRequestId: 4,
      friendName: "gabe817",
      message: "",
      id: 1,
    },
  ]);

  onMounted(async () => {
    const notificationsQuiz = await getLocalStorageItem("notificationsQuiz");
    if (notificationsQuiz) {
      notifications.value = notificationsQuiz;
    }
  });

  function deleteNotification(id: number) {
    notifications.value = notifications.value.filter(
      (notification: NotificationData) => notification.id !== id
    );
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    const notificationList = JSON.stringify(notifications.value);
    window.localStorage.setItem("notificationsQuiz", notificationList);
  }

  function resetNotifications() {
    notifications.value = [
      {
        type: NotificationType.FriendRequest,
        friendRequestId: 4,
        friendName: "gabe817",
        message: "",
        id: 1,
      },
    ];
  }

  return { notifications, deleteNotification, resetNotifications };
});
