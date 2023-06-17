import { NotificationType } from "~/enums/notificationType";

export interface NotificationData {
  type: NotificationType;
  friendRequestId: null | number;
  friendName: string;
  id: number;
}
