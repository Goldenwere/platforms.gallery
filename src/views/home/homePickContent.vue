<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog'
import { ref } from 'vue'
import { useStore } from 'src/store'
import { validateContentDirectory } from 'src/utils/platform'

const emit = defineEmits<{
  (e: 'contentLoaded'): void,
}>()

const store = useStore()
const validContentDirectory = ref('Not Loaded')

const onPickContent = async (event: Event) => {
  const folderPath = await open({
    directory: true,
    multiple: false,
  })
  const result = await validateContentDirectory(folderPath)
  if (result.validContentDirectory === 'Valid') {
    store.$patch({
      managedContentDirectory: folderPath as string,
      loadedApp: result.appResponse,
      loadedHome: result.homeResponse,
    })
    emit('contentLoaded')
  } else {
    validContentDirectory.value = result.validContentDirectory
  }
}

const onCreateContent = async (event: Event) => {
  event.preventDefault()
}
</script>

<template lang="pug">
section#pick-content
  h2 No Content Selected
  p Pick from an existing content directory or create a new one
  p(
    v-if='validContentDirectory !== "Not Loaded"'
  ) Error with selected directory: {{ validContentDirectory }}
  .form
    button.gw-input-element(
      @click='onPickContent($event)'
    )
      span Choose Existing Directory
    button.gw-input-element(
      @click='onCreateContent($event)'
    )
      span Create New Directory
</template>

<style scoped lang="sass">

</style>
