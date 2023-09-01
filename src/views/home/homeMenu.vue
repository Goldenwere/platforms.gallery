<script setup lang="ts">
import { useRouter } from 'vue-router'

import GwButton from 'src/components/inputs/button.vue'

const router = useRouter()

const goTo = (event: Event, name: string) => {
  event.preventDefault()
  router.push({ name })
}
</script>

<template lang="pug">
section#home-menu
  h2 Home
  .menu-grid
    GwButton(
      @click='goTo($event, "appEditor")'
    )
      span Configure App
</template>

<style scoped lang="sass">

</style>
