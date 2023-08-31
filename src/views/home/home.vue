<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'src/store';

import HomeMenu from './homeMenu.vue'
import HomePickContent from './homePickContent.vue'

const store = useStore()
const loaded = ref(!!store.managedContentDirectory)

const onContentLoaded = () => {
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
  HomeMenu
</template>

<style scoped lang="sass">

</style>
