<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppViewModel } from '@goldenwere/types.gallery'

import { useStore } from 'src/store'
import { writeYaml } from 'src/utils/fetch'
import { APP_CONFIG } from 'src/utils/constants'

import GwButton from 'src/components/inputs/button.vue'

const store = useStore()
const router = useRouter()
const appContent = reactive(store.loadedApp as AppViewModel)
const error = ref('')

const onSave = (event: Event) => {
  event.preventDefault()
  writeYaml(appContent, `${store.managedContentDirectory}/${APP_CONFIG}`)
  .catch((err) => error.value = err)
  .then(() => {
    store.$patch({
      loadedApp: appContent
    })
    router.push({ name: 'home' })
  }) 
}

const onCancel = (event: Event) => {
  event.preventDefault()
  router.push({ name: 'home' })
}
</script>

<template lang="pug">
section#app-editor
  h2 App Editor
  p(
    v-if='error !== ""'
  ) Error: {{ error }}
  .form
    .gw-input-container.gw-text-field
      label(
        for="app title"
      ) Title
      input(
        type='text'
        name='app title'
        v-model="appContent.title"
      )
    .gw-input-container.gw-text-field
      label(
        for="app subtitle"
      ) Subtitle
      input(
        type='text'
        name='app subtitle'
        v-model="appContent.subtitle"
      )
    GwButton(
      @click='onSave($event)'
    )
      span Save
    GwButton(
      @click='onCancel($event)'
    )
      span Cancel
</template>

<style scoped lang="sass">

</style>
