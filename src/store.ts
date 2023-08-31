import { defineStore } from 'pinia';
import { AppViewModel, HomeViewModel } from '@goldenwere/types.gallery'

export const useStore = defineStore('store', {
  state: () => ({
    managedContentDirectory: null as string | null,
    loadedApp: null as AppViewModel | null,
    loadedHome: null as HomeViewModel | null,
  }),
});
