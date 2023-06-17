export interface Modals {
  modalProfileIsOpen: boolean;
  modalMessagesIsOpen: boolean;
  modalGameSettingsIsOpen: boolean;
  modalInfosIsOpen: boolean;
  modalAlert: {
    isOpen: boolean;
    message: string;
    onConfirm: Function | undefined;
  };
}
