import { Ref, onMounted, onUnmounted, ref } from "vue";

function useOutsideClick(elementActivator: Ref<HTMLElement | null>) {
  const toggleIsOpen = ref<boolean>(false);

  function onCheckClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      target !== elementActivator.value &&
      !elementActivator.value?.contains(target)
    ) {
      toggleIsOpen.value = false;
    }
  }

  function closeContentToggle() {
    toggleIsOpen.value = false;
  }

  onMounted(() => {
    window.addEventListener("click", onCheckClickOutside);
    window.addEventListener("scroll", closeContentToggle);
  });

  onUnmounted(() => {
    window.removeEventListener("click", onCheckClickOutside);
    window.removeEventListener("scroll", closeContentToggle);
  });

  return { toggleIsOpen };
}

export default useOutsideClick;
