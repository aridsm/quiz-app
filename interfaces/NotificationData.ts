import { NotificationType } from "~/enums/notificationType";

export interface NotificationData {
  type: NotificationType;
  confirm: Function | undefined;
  friendRequestId: null | number;
  seen: boolean;
  id: number;
}
