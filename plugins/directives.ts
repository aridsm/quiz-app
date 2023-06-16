import Vue from "vue";
import { storeToRefs } from "pinia";
import { useTooltip } from "~/store/tooltip";

Vue.directive("title", (element: any, binding: any) => {
  const storeTooltip = useTooltip();
  const { tooltip } = storeToRefs(storeTooltip);

  function showTooltip() {
    const elementHeight = element.getBoundingClientRect().height;
    const positionTop =
      window.pageYOffset + element.getBoundingClientRect().top - elementHeight;
    const positionLeft = element.getBoundingClientRect().left;
    const positionRight = element.getBoundingClientRect().right;
    tooltip.value.text = binding.value;
    tooltip.value.position = {
      top: positionTop,
      left: positionLeft,
      right: positionRight,
      bottom: 0,
    };
    tooltip.value.isShown = true;
  }

  function hideTooltip() {
    tooltip.value.isShown = false;
  }

  element.addEventListener("mouseenter", showTooltip);
  element.addEventListener("mouseleave", hideTooltip);
});
