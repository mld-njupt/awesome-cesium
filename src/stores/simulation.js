import { defineStore } from "pinia";

export const useSimuStore = defineStore({
  id: "simu",
  state: () => ({
    simuData: {
      start: "",
      end: "",
      rainfall: "",
      evaporation: "",
      temperature: "",
      showSimu: false,
    },
  }),
  actions: {},
});
