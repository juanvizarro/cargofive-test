<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="`${sizeClass}`"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    v-html="icon"
    @click="onClick"
  ></svg>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  small: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["click"]);

//  data
const magnify = ref(
  `<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />`
);
const chevronLeft = ref(
  `<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />`
);
const chevronRight = ref(
  `<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />`
);
const chevronDoubleLeft = ref(
  `<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />`
);
const chevronDoubleRight = ref(
  `<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />`
);
const chevronUp = ref(
  `<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />`
);
const chevronDown = ref(
  `<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />`
);
//  computed
const icons = computed(() => {
  return [
    {
      name: "magnify",
      value: magnify.value,
    },
    {
      name: "chevronLeft",
      value: chevronLeft.value,
    },
    {
      name: "chevronRight",
      value: chevronRight.value,
    },
    {
      name: "chevronDoubleLeft",
      value: chevronDoubleLeft.value,
    },
    {
      name: "chevronDoubleRight",
      value: chevronDoubleRight.value,
    },
    {
      name: "chevronUp",
      value: chevronUp.value,
    },
    {
      name: "chevronDown",
      value: chevronDown.value,
    },
  ];
});
const sizeClass = computed(() => {
  return `${props.small ? "h-5 w-5" : "h-6 w-6"}`;
});
const icon = computed(() => {
  const icon = icons.value.find((item) => item.name === props.name);
  return icon?.value;
});

// methods
const onClick = () => {
  emit("click");
};
</script>
