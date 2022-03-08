<template>
  <div class="card w-full">
    <div class="flex place-content-between items-center mb-6">
      <span class="font-semibold text-primary text-lg">{{ props.title }}</span>
      <Input placeholder="Buscar..." class="w-1/2 md:w-1/4" v-model="search">
        <template #appendIcon>
          <icon name="magnify" small />
        </template>
      </Input>
    </div>
    <div class="w-full datatable__wrapper">
      <data-table-footer
        :meta="meta"
        @first="onFirst"
        @prev="onPrev"
        @next="onNext"
        @last="onLast"
        :loading-first="footer.loadingFirst"
        :loading-prev="footer.loadingPrev"
        :loading-next="footer.loadingNext"
        :loading-last="footer.loadingLast"
      />

      <table class="datatable">
        <thead class="font-medium datatable--header">
          <tr class="bg-primary">
            <th
              v-for="(header, i) in headersComputed"
              :key="i"
              class="font-semibold py-3 px-2 text-white text-left"
              :style="{ width: header.width }"
            >
              <span>{{ header.text }}</span>
              <!-- <select-header :text="header.text" :options="header.items" /> -->
            </th>
          </tr>
          <!-- LOADING -->
          <tr v-if="isLoading" class="datatable--progress">
            <th :colspan="headers.length">
              <progress-bar />
            </th>
          </tr>
        </thead>
        <tbody class="datatable--body">
          <tr
            v-for="(item, i) in itemsComputed"
            :key="i"
            class="hover:bg-gray-100"
          >
            <td v-for="(header, j) in props.headers" :key="j">
              {{ item[header.value] }}
            </td>
          </tr>
          <!-- NO DATA -->
          <tr v-if="isEmpty && !isLoading" class="empty">
            <td :colspan="headers.length" class="text-center">
              No hay registros disponibles
            </td>
          </tr>
          <!-- LOADING DATA -->
          <tr v-if="isLoading">
            <td :colspan="headers.length" class="text-center">
              Cargando registros...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  onMounted,
  ref,
  inject,
  computed,
  WritableComputedRef,
  reactive,
} from "vue";
// components
import ProgressBar from "@/components/progress/ProgressBar.vue";
import Input from "@/components/inputs/Input.vue";
import Icon from "@/components/icons/Icon.vue";
import Btn from "@/components/buttons/Btn.vue";
import DataTableFooter from "@/components/datatables/DataTableFooter.vue";
import SelectHeader from "@/components/selects/SelectHeader.vue";
const props = defineProps({
  /**
   * titulo de la tabla
   */
  title: {
    type: String,
    default: "",
  },
  /**
   * cabeceras de la tabla
   */
  headers: {
    type: Array,
    default: () => [],
  },
  /**
   * nombre del controlador para consumir los datos
   */
  controller: {
    type: String,
    default: null,
  },
});
const $axios = inject("$axios");

// computed
/**
 * muestra items procesados
 * @returns {Array}
 */
const itemsComputed = computed(() => {
  const currentItems = items.value;
  // si no se usa el buscador, mostrar todos los items
  if (search.value === "") {
    return currentItems;
  }
  // filtramos items segun valor de search
  else {
    // obtenemos valor de busqueda
    const searchValue = search.value.toLowerCase();
    // filtramos items
    return currentItems.filter((item) => {
      let found = false;
      // recorremos cada columna
      props.headers.forEach((header) => {
        // obtenemos el valor de cada columna
        const itemValue = item[header.value]
          ? item[header.value].toLowerCase()
          : "";
        // si hay coincidencia con el valor de busqueda, establecemos que el item ha sido encontrado y cortamos el bucle
        if (itemValue.includes(searchValue)) {
          found = true;
          return false;
        }
      });

      return found;
    });
  }
});
/**
 * @returns {boolean} true si items esta vacio
 */
const isEmpty = computed(() => itemsComputed.value.length === 0);
/**
 * @returns {number} pagina actual del datatable
 */
const currentPage: WritableComputedRef<number> = computed({
  get() {
    return meta.value.current_page;
  },
  set(value) {
    meta.value.current_page = value;
  },
});
const headersComputed = computed(() => {
  const headers = props.headers.map((header) => {
    return {
      ...header,
      items: getDistinctsItemsByColumn(header.value),
    };
  });
  return headers;
});

// data
let items = ref([]);
let meta = ref({});
let links = ref({});

/**
 * indica si se esta cargando los datos
 */
const isLoading = ref(false);
/**
 * valor de busqueda
 */
const search = ref("");
/**
 * loaders de los botones del footer
 */
const footer = reactive({
  loadingFirst: false,
  loadingPrev: false,
  loadingNext: false,
  loadingLast: false,
});

// methods

const getDistinctsItemsByColumn = (headerName) => {

  const columnItems = itemsComputed.value.map((item) => {
    return item[headerName];
  });
  return columnItems.filter((value, i, self) => {
    return self.indexOf(value) === i;
  });
};
/**
 * consume endpoint para obtener los datos del datatable
 */
const initData = (endpoint?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      // limpiamos los items
      items.value = [];
      // mostramos progressbar
      isLoading.value = true;

      endpoint = endpoint || props.controller;
      // obtenemos datos de endpoint
      const { data } = await $axios.get(endpoint);
      // seteamos los datos en las variables
      items.value = data.data;
      meta.value = data.meta;
      links.value = data.links;
      // dejamos de mostrar progressbar
      isLoading.value = false;
      // resolvemos la promesa
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
/**
 * reduce en 1 la pagina actual y obtenemos los datos del mismo
 */
const onPrev = async () => {
  // si la pagina actual no es la primera
  if (currentPage.value > 1) {
    footer.loadingFirst = true;
    currentPage.value--;
    await pagination();
    footer.loadingFirst = false;
  }
};
/**
 * incrementa en 1 la pagina actual y obtenemos los datos del mismo
 */
const onNext = async () => {
  // si no estamos en la ultima pagina
  if (currentPage.value < meta.value.last_page) {
    footer.loadingNext = true;
    currentPage.value++;
    await pagination();
    footer.loadingNext = false;
  }
};
/**
 * obtiene los datos de la primera pagina
 */
const onFirst = async () => {
  // si no estamos en la primera pagina
  if (currentPage.value > 1) {
    footer.loadingFirst = true;
    currentPage.value = 1;
    await pagination();
    footer.loadingFirst = false;
  }
};
/**
 * obtiene los datos de la ultima pagina
 */
const onLast = async () => {
  // si la pagina actual es menor a la ultima pagina
  if (currentPage.value < meta.value.last_page) {
    footer.loadingLast = true;
    currentPage.value = meta.value.last_page;
    await pagination();
    footer.loadingLast = false;
  }
};
const pagination = async () => {
  const endpoint = `${props.controller}?page=${currentPage.value}`;
  await initData(endpoint);
};
onMounted(async () => {
  currentPage.value = 1;

  // inicializamos la información
  await initData();
});
</script>

<style lang="scss">
.datatable__wrapper {
  overflow-x: auto;
  overflow-y: hidden;

  .datatable {
    color: rgba(0, 0, 00.87);
    line-height: 1.5;
    min-width: 100%;
    width: 100%;
    border-spacing: 0;
    border-radius: 8px;
    &--header {
      border-bottom: thin solid hsla(0, 0%, 100%, 0.12);
      font-size: 1rem;
      tr {
        th:first-child {
          border-top-left-radius: 6px;
        }
        th:last-child {
          border-top-right-radius: 6px;
        }
      }
    }
    &--progress {
      height: auto !important;
    }
    &--body {
      tr:not(:last-child) {
        &:hover {
          transition: box-shadow 0.2s ease-in-out, background 0.2s;
          box-shadow: 0 3px 15px -2px rgb(0 0 0 / 25%);
        }
        td {
          border-bottom: thin solid rgba(0, 0, 0, 0.12);
        }
      }

      td {
        height: 38px;
        padding: 0 16px;
        transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
      }

      /** BORDE IZUQIERDO EN HOVER DE FILA */
      tr:not(.empty) {
        td:first-child {
          border-left: 8px solid transparent;
          transition: border-left 0.3s;
        }
        &:hover {
          td:first-child {
            border-left: 8px solid rgb(var(--color-primary));
          }
        }
      }
      .empty {
        td:first-child {
          border-left: 8px solid transparent;
        }
      }
    }
  }
}

.card {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  padding: 16px;
  border-radius: 8px;
}
</style>
