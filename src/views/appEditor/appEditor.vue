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
    const split = tempPathToFavicon.value.split('/')
    appContent.faviconUrl = `/${split[split.length - 1]}`
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
    const split = tempPathToLogo.value.split('/')
    appContent.logo = `/${split[split.length - 1]}`
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
    .gw-input-container.form-container.image-picker
      label Favicon
      GwButton(
        @click='onPickFavicon($event)'
      )
        span Select File
      .selected-image(
        v-if='!!tempDataOfFavicon'
      )
        p The path for this will become {{ store.managedContentDirectory }}{{ appContent.faviconUrl }}
        GwTextField(
          label='Favicon'
          name='app favicon'
          v-model='appContent.faviconUrl'
        )
        .preview 
          p Selected Favicon
          img(
            :src='tempDataOfFavicon'
            alt='selected favicon'
          )
      span(
        v-else
      ) No image selected
    .gw-input-container.form-container.image-picker
      label Logo
      GwButton(
        @click='onPickLogo($event)'
      )
        span Select File
      .selected-image(
        v-if='!!tempDataOfLogo'
      )
        p The path for this will become {{ store.managedContentDirectory }}{{ appContent.logo }}
        GwTextField(
          label='Logo'
          name='app logo'
          v-model='appContent.logo'
        )
        .preview
          p Selected Logo
          img(
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
.form
  border: var(--gw-input-border)
  border-radius: var(--gw-input-round)
  padding: var(--gw-input-spacing)

.image-picker
  border: var(--gw-input-border)
  border-radius: var(--gw-input-round)
  margin: var(--gw-input-spacing)
  label
    display: block
  > label
    margin: var(--gw-input-spacing)
    margin-bottom: 0
  .selected-image
    p
      margin: var(--gw-input-spacing)
    img
      display: block
      max-width: 4em
      max-height: 4em
</style>
