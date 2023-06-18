import { ProfileOptions } from "~/enums/profileOptions";

export interface Modals {
  modalProfile: {
    isOpen: boolean;
    tabActived: ProfileOptions;
  };
  modalGameSettingsIsOpen: boolean;
  modalInfosIsOpen: boolean;
  modalSearchIsOpen: boolean;
  modalAlert: {
    isOpen: boolean;
    message: string;
    onConfirm: Function | undefined;
  };
}
