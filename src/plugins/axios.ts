import axios, { AxiosInstance } from "axios";

// creando instancia de axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://apitest.cargofive.com/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default {
  install: (app) => {
    app.provide("$axios", axiosInstance); // para compositionAPI
    app.config.globalProperties.$axios = axiosInstance; // para OptionsAPI
  },
};
