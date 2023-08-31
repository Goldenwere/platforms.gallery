<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'src/store';

import HomePickContent from './homePickContent.vue'

const store = useStore()
const appContent = ref(store.loadedApp)
const loaded = ref(false)

const onContentLoaded = () => {
  appContent.value = store.loadedApp
  loaded.value = true
}
</script>

<template lang="pug">
div(
  v-if='!loaded'
)
  HomePickContent(
    @contentLoaded='onContentLoaded()'
  )
div(
  v-else
)
  .input-container
    label(
      for="something"
    ) Title
    input(
      type='text'
      :value="appContent.title"
    )
  .input-container
    label(
      for="something"
    ) Subtitle
    input(
      type='text'
      :value='appContent.subtitle'
    )
</template>

<style scoped lang="sass">

</style>
