<script setup lang="ts">
defineProps<{
  label: string,
  modelValue: string,
  name: string,
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template lang="pug">
.gw-input-container.gw-text-field
  label(
    :for='name || label'
  ) {{ label }}
  input.gw-input(
    type='text'
    :name='name || label'
    :value='modelValue'
    @input='$emit("update:modelValue", $event.target.value)'
  )
</template>

<style scoped lang="sass">
@import 'src/styles/inputs.scss'
</style>
