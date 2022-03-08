<template>
  <div class="relative z-0 group input__wrapper">
    <input
      type="text"
      name="floating_first_name"
      :id="idName"
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer rounded-sm input"
      :placeholder="props.placeholder"
      v-model="model"
    />
    <label
      :for="idName"
      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >{{ props.label }}</label
    >
    <div class="input-icon text-gray-500">
      <slot name="appendIcon"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
//  composables
import { useVModel } from "@/composables/useVModel";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: " ",
  },
  modelValue: {
    type: String,
    default: "",
  },
});
/* const emit = defineEmits(["update:modelValue"]); */

//  computed
const idName: string = computed(() => {
  const random = Math.random() * 1000;
  return parseInt(random.toString()).toString();
});
//  v-model
let model = useVModel(props);
</script>
<style lang="scss">
.input__wrapper {
  .input {
    transition: border-color 0.7s;
  }
  .input-icon {
    position: absolute;
    right: 6px;
    top: 8px;
  }
}
</style>
