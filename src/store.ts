import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    managedApp: null as string | null,
  }),
});
