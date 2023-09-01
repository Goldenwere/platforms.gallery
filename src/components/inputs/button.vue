<script setup lang="ts">
defineEmits<{
  (e: 'click', event: Event): void
}>()
</script>

<template lang="pug">
button.gw-input.gw-input-container(
  @click='$emit("click", $event)'
)
  slot
</template>

<style scoped lang="sass">
@import 'src/styles/inputs.scss'
</style>
