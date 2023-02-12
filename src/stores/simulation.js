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
      isSave: false,
      isComputed: false,
      //1是模拟 2是预报
      flag: 1,
    },
  }),
  actions: {},
});
