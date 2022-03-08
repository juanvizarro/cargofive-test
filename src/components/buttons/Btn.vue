<template>
  <button
    @click="onClick"
    :class="`font-medium ${props.color} hover:${props.color}/50 btn ${
      props.dark ? 'text-white' : ''
    } ${props.disabled ? 'disabled' : ''} ${
      props.loading ? 'btn__loading' : ''
    }`"
    :disabled="props.disabled"
  >
    <div class="btn--content">
      <slot>
        <Icon :small="props.small" v-if="props.icon" :name="props.icon" />
      </slot>
    </div>
    <div
      v-if="props.loading"
      class="btn--loader flex justify-center items-center"
    >
      <progress-circular style="height: 23px; width: 23px" />
    </div>
  </button>
</template>
<script setup lang="ts">
import Icon from "@/components/icons/Icon.vue";
import ProgressCircular from "@/components/progress/ProgressCircular.vue";
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "bg-primary",
  },
});
const emit = defineEmits(["click"]);
// methods
const onClick = () => {
  if (!props.loading) emit("click");
};
</script>
<style scoped lang="scss">
.btn {
  position: relative;
  padding: 6px 20px;
  border-radius: 6px;
  position: relative;
  &::before {
    content: "";
    background: currentColor;
    opacity: 0;
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }
  &:hover::before {
    opacity: 0.1;
  }
  &.disabled {
    background-color: rgba(0, 0, 0, 0.15) !important;
    color: rgba(0, 0, 0, 0.3) !important;
  }
  &__loading {
    .btn--content {
      opacity: 0;
    }
  }
  &--loader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
  }
}
</style>
