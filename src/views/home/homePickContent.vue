<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog'
import { ref } from 'vue'
import { useStore } from 'src/store'
import { createNewDirectory, validateContentDirectory } from 'src/utils/platform'
import GwButton from 'src/components/inputs/button.vue'

const emit = defineEmits<{
  (e: 'contentLoaded'): void,
}>()

const store = useStore()
const validContentDirectory = ref('Not Loaded')
const createDirectory = ref('')

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

const onCreateContent = async (event: Event, action: string) => {
  event.preventDefault()
  validContentDirectory.value = 'Not Loaded'
  if (createDirectory.value === '' || action === 'no') {
    const folderPath = await open({
      directory: true,
      multiple: false,
    })
    if (folderPath as string !== null) {
      createDirectory.value = folderPath as string
    } else {
      validContentDirectory.value = 'No directory selected'
    }
  } else if (action === 'yes') {
    createNewDirectory(createDirectory.value)
    .then(value => {
      store.$patch({
        managedContentDirectory: createDirectory.value,
        loadedApp: value.appResponse,
        loadedHome: value.homeResponse,
      })
      emit('contentLoaded')
    })
    .catch(err => {
      validContentDirectory.value = err.toString()
    })
  } else {
    createDirectory.value = ''
  }
}
</script>

<template lang="pug">
section#pick-content
  h2 No Content Selected
  p Pick from an existing content directory or create a new one
  p(
    v-if='validContentDirectory !== "Not Loaded"'
  ) Error with selected directory: {{ validContentDirectory }}
  .form(
    v-if='createDirectory === ""'
  )
    GwButton(
      @click='onPickContent($event)'
    )
      span Choose Existing Directory
    GwButton(
      @click='onCreateContent($event)'
    )
      span Create New Directory
  .form(
    v-else
  )
    p Is {{ createDirectory + '/content' }} ok?
    GwButton(
      @click='onCreateContent($event, "yes")'
    ) Yes (Create)
    GwButton(
      @click='onCreateContent($event, "no")'
    ) No (Pick Again)
    GwButton(
      @click='onCreateContent($event, "cancel")'
    ) Cancel (Go Back to Options)
</template>

<style scoped lang="sass">

</style>
