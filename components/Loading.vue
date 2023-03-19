<template>
  <div id="overlay">
    <div class="text-center">
      <div class="spinner-centered">
        <spinner class="" color="purple" size="11" />
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Spinner } from 'flowbite-vue'
export default defineComponent({
  name: "LoadingBar",
  components: {
    Spinner,
  },
  // Mechanism that restricts Tab, Shift + Tab and Enter key events when
  // loading is enabled (this way we prevent multiple submitions of buttons that would trigger multiple requests)
  mounted(): void {
    // Enabling the key events mechanism when loading is enabled.
    // Use the handler method exactly like this because the listener of addEventListener and removeEventListener must match
    window.addEventListener("keydown", this.keyEventsHandler);
  },
  beforeUnmount(): void {
    // Disabling the key events mechanism when loading is disabled.
    window.removeEventListener("keydown", this.keyEventsHandler);
  },
  methods: {
    keyEventsHandler(e: any): void {
      if (e.key === "Tab" || (e.keyCode === 9 && e.key === "Tab") || e.key === "Enter") {
        e.preventDefault();
      }
    },
  },
});
</script>
<style scoped>
#overlay {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 2000;
}

.spinner-centered {
  position: fixed;
  z-index: 1031;
  top: 50%;
  transform: translateX(50%);
  right: 50%;
  width: 3rem;
  height: 3rem;
}
</style>
