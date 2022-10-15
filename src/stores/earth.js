import { defineStore } from "pinia";

export const useViewStore = defineStore({
  id: "viewer",
  state: () => ({
    cesiumViewer: null,
  }),
  actions: {
    setCesiumViewer(viewer) {
      this.cesiumViewer = viewer;
    },
  },
});
