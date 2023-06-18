import { defineStore } from "pinia";
import { ref } from "vue";
import { ProfileOptions } from "~/enums/profileOptions";
import { Modals } from "~/interfaces/Modals";

export const useModals = defineStore("useModals", () => {
  const modals = ref<Modals>({
    modalProfile: {
      isOpen: false,
      tabActived: ProfileOptions.Profile,
    },
    modalGameSettingsIsOpen: false,
    modalInfosIsOpen: false,
    modalSearchIsOpen: false,
    modalAlert: {
      isOpen: false,
      message: "",
      onConfirm: undefined,
    },
  });

  return { modals };
});
