<template>
  <!-- <BaseTemplate title="Vite-TS-Tailwind Starter"> -->
  <!-- </BaseTemplate> -->
  <main class="container mx-auto p-4">
    <data-table controller="ports" title="Puertos" :headers="headers" />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseTemplate from "@/components/BaseTemplate.vue";
import DataTable from "@/components/datatables/DataTable.vue";

//  data
const headers = ref([
  { text: "Nombre", value: "name" },
  { text: "Pais", value: "country" },
  { text: "Continente", value: "continent",width:'180px' },
  { text: "Coordenadas", value: "coordinates" },
  /* { text: "Actions" }, */
]);
</script>
