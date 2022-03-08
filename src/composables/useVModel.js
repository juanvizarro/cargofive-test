import { computed, getCurrentInstance } from "vue";
export const useVModel = (props) => {
  const { emit } = getCurrentInstance();
  return computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
};
