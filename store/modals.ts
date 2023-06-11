import { defineStore } from "pinia";
import { ref } from "vue";
import { Modals } from "~/interfaces/Modals";

export const useModals = defineStore("useModals", () => {
  const modals = ref<Modals>({
    modalProfileIsOpen: false,
    modalMessagesIsOpen: false,
    modalGameSettingsIsOpen: false,
    modalInfosIsOpen: false,
  });

  return { modals };
});
