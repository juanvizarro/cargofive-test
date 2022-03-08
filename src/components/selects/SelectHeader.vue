<template>
  <multiselect
    :placeholder="props.text"
    v-model="model"
    :options="optionsComputed"
    mode="multiple"
    :close-on-select="false"
    :hide-selected="true"
    class="bg-inherit"
  ></multiselect>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useVModel } from "@/composables/useVModel.js";
import Multiselect from "@vueform/multiselect";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [Array],
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const optionsComputed = computed(() => {
  return props.options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
});

// model
let model = useVModel(props);
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
.multiselect-dropdown {
  .multiselect-option {
    span {
      color: #000;
    }
  }
}
</style>
