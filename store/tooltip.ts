import { defineStore } from "pinia";
import { reactive } from "vue";
import { Tooltip } from "~/interfaces/Tooltip";

export const useTooltip = defineStore("useTooltip", () => {
  const tooltip = reactive<Tooltip>({
    isShown: false,
    text: "",
    position: {
      left: 0,
      top: 0,
    },
  });

  return { tooltip };
});
