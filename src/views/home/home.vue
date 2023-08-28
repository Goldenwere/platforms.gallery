<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../store';
import { open } from '@tauri-apps/api/dialog';

const store = useStore()

const loaded = ref(!!store.managedApp)

const pickFile = async (event: Event) => {
  event.preventDefault()

  const filePath = await open({
    filters: [{
      name: 'YAML',
      extensions: ['yml', 'yaml']
    }]
  })

  if (!!filePath) {
    store.$patch({ managedApp: filePath as string })
    loaded.value = true
  }
}
</script>

<template lang="pug">
div(
  v-if='!loaded'
)
  button(
    @click='pickFile'
  )
    span Pick File
div(
  v-else
)
  span {{ store.managedApp }}
</template>

<style scoped lang="sass">

</style>
