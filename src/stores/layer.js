import { defineStore } from "pinia";

export const useLayerStore = defineStore({
  id: "layer",
  state: () => ({
    showLayer: false,
  }),
  actions: {},
});
