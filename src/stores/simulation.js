import { defineStore } from "pinia";
import moment from "moment";
export const useSimuStore = defineStore({
  id: "simu",
  state: () => ({
    simuData: {
      start: moment("2015-05-07"),
      end: moment("2018-05-07"),
      rainfall: "",
      evaporation: "",
      temperature: "",
    },
  }),
  actions: {},
});
