import { defineStore } from "pinia";

export const useClickStore = defineStore({
  id: "click",
  state: () => ({
    clickStack: [],
  }),
  actions: {},
});
