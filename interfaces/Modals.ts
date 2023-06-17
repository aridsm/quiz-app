import { ProfileOptions } from "~/enums/profileOptions";

export interface Modals {
  modalProfile: {
    isOpen: boolean;
    tabActived: ProfileOptions;
  };
  modalMessagesIsOpen: boolean;
  modalGameSettingsIsOpen: boolean;
  modalInfosIsOpen: boolean;
  modalAlert: {
    isOpen: boolean;
    message: string;
    onConfirm: Function | undefined;
  };
}
