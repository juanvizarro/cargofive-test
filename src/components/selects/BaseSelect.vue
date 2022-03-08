<template>
  <div class="relative">
    <button
      class="bg-teal p-1 rounded text-white shadow-inner w-full"
      @click="showMenu = !showMenu"
    >
      <span class="float-left">{{ props.text }}</span>

      <icon :name="selectIcon" class="text-white float-right" />
    </button>
    <div class="rounded shadow-md my-2 relative pin-t pin-l" v-if="showMenu">
      <ul class="list-reset">
        <li class="p-2"><input class="border-2 rounded h-8 w-full" /><br /></li>
        <li>
          <p class="p-2 block text-black hover:bg-grey-light cursor-pointer">
            USA
            <svg
              class="float-right"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"
              />
            </svg>
          </p>
        </li>
        <li>
          <p class="p-2 block text-black hover:bg-grey-light cursor-pointer">
            Montenegro
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import Icon from "@/components/icons/Icon.vue";
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});

// data
let showMenu = ref(false);

// computed
const selectIcon = computed(() => {
  return showMenu.value ? "chevronUp" : "chevronDown";
});
</script>
