<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppViewModel } from '@goldenwere/types.gallery'

import { useStore } from 'src/store'
import { fetchAndReturnImageBlob, openDialogPrompt, writeYaml } from 'src/utils/fetch'
import { APP_CONFIG } from 'src/utils/constants'

import GwButton from 'src/components/inputs/button.vue'
import GwTextField from 'src/components/inputs/textField.vue'

const store = useStore()
const router = useRouter()
const appContent = reactive(store.loadedApp as AppViewModel)
const error: Ref<string | null> = ref(null)
const tempPathToFavicon: Ref<string | null> = ref(null)
const tempDataOfFavicon: Ref<string | null> = ref(null)
const tempPathToLogo: Ref<string | null> = ref(null)
const tempDataOfLogo: Ref<string | null> = ref(null)

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

const onPickFavicon = async (event: Event) => {
  event.preventDefault()
  tempPathToFavicon.value = await openDialogPrompt({
    title: 'Pick favicon',
    filters: [
      {
        name: 'Valid favicon image',
        extensions: [ 'ico' ],
      }
    ]
  }) as unknown as string | null
  if (!!tempPathToFavicon.value) {
    tempDataOfFavicon.value = (await fetchAndReturnImageBlob(tempPathToFavicon.value)).toString()
  }
}

const onPickLogo = async (event: Event) => {
  event.preventDefault()
  tempPathToLogo.value = await openDialogPrompt({
    title: 'Pick logo',
    filters: [
      {
        name: 'Valid logo image',
        extensions: [ 'png', 'jpg', 'jpeg', 'gif' ],
      }
    ]
  }) as unknown as string | null
  if (!!tempPathToLogo.value) {
    tempDataOfLogo.value = (await fetchAndReturnImageBlob(tempPathToLogo.value)).toString()
  }
}
</script>

<template lang="pug">
section#app-editor
  h2 App Editor
  p(
    v-if='!!error'
  ) Error: {{ error }}
  .form
    GwTextField(
      label='Title'
      name='app title'
      v-model='appContent.title'
    )
    GwTextField(
      label='Subtitle'
      name='app subtitle'
      v-model='appContent.subtitle'
    )
    .form-container
      label Favicon
      GwButton(
        @click='onPickFavicon($event)'
      )
        span Select File
      img(
        v-if='!!tempDataOfFavicon'
        :src='tempDataOfFavicon'
        alt='selected favicon'
      )
      span(
        v-else
      ) No image selected
    .form-container
      label Logo
      GwButton(
        @click='onPickLogo($event)'
      )
        span Select File
      img(
        v-if='!!tempDataOfLogo'
        :src='tempDataOfLogo'
        alt='selected logo'
      )
      span(
        v-else
      ) No image selected
    .form-options
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
#app-editor
  .form
    border: var(--gw-input-border)
    border-radius: var(--gw-input-round)
    padding: var(--gw-input-spacing)
</style>
