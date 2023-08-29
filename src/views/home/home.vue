<script setup lang="ts">
import { type AppViewModel } from '@goldenwere/types.gallery'
import { ref } from 'vue';
import { useStore } from '../../store';
import { fetchAndParseYaml } from '../../utils/fetch';
import { open } from '@tauri-apps/api/dialog';

const store = useStore()

const selected = ref(!!store.managedApp)
const loaded = ref(null as AppViewModel | null)

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
    console.log(filePath)

    const loadedYaml = await fetchAndParseYaml(filePath as string) as AppViewModel

    console.log(loadedYaml)

    if (!!loadedYaml.title && !!loadedYaml.directories) {
      selected.value = true
      loaded.value = loadedYaml
    }
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
  .input-container
    label(
      for="something"
    ) Title
    input(
      type='text'
      :value="loaded.title"
    )
  .input-container
    label(
      for="something"
    ) Subtitle
    input(
      type='text'
      :value='loaded.subtitle'
    )
</template>

<style scoped lang="sass">

</style>
