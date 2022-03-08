<template>
  <div
    class="flex flex-col md:flex-row place-content-between pb-4 items-center"
  >
    <span
      >Mostrando {{ meta.from }} - {{ meta.to }} de
      {{ meta.total }} registros</span
    >
    <div class="flex items-center mt-2 md:mt-0">
      <btn
        icon="chevronDoubleLeft"
        dark
        @click="onFirst"
        :disabled="disabledPrev"
        small
        :loading="props.loadingFirst"
      />
      <btn
        dark
        icon="chevronLeft"
        :disabled="disabledPrev"
        @click="onPrev"
        class="ml-1"
        small
        :loading="props.loadingPrev"
      />
      <span class="mx-4 font-semibold text-base">{{ currentPage }}</span>
      <btn
        dark
        icon="chevronRight"
        :disabled="disabledNext"
        @click="onNext"
        class="ml-1"
        small
        :loading="props.loadingNext"
      />
      <btn
        icon="chevronDoubleRight"
        dark
        @click="onLast"
        :disabled="disabledNext"
        class="ml-1"
        small
        :loading="props.loadingLast"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Btn from "@/components/buttons/Btn.vue";

const props = defineProps({
  /**
   * objeto meta obtenido del consumo del endpoint
   */
  meta: {
    type: Object,
    default: () => ({}),
  },
  loadingFirst: {
    type: Boolean,
    default: false,
  },
  loadingPrev: {
    type: Boolean,
    default: false,
  },
  loadingNext: {
    type: Boolean,
    default: false,
  },
  loadingLast: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["first", "prev", "next", "last"]);

// computed

/**
 * @returns {number} pagina actual dela  paginación
 */
const currentPage = computed(() => {
  return props.meta.current_page;
});
/**
 * indica si el boton de pagina anterior estará deshabilitado
 * @returns {boolean} true si la pagina actual es la primera
 */
const disabledPrev = computed(() => currentPage.value === 1);
/**
 * indica si el boton de pagina siguiente estará deshabilitado
 * @returns {boolean} true si la pagina actual es la ultima
 */
const disabledNext = computed(() => currentPage.value === props.meta.last_page);

// methods

/**
 * emite evento para ir a la primera pagina
 */
const onFirst = () => {
  emit("first");
};
/**
 * emite evento para ir a la pagina anterior
 */
const onPrev = () => {
  emit("prev");
};
/**
 * emite evento para ir a la pagina siguiente
 */
const onNext = () => {
  emit("next");
};
/**
 * emite evento para ir a la ultima pagina
 */
const onLast = () => {
  emit("last");
};
</script>
