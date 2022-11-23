import { defineStore } from "pinia";

export const useDataStore = defineStore("main", {
  state: () => ({
    volume_30d: 1,
  }),
});
