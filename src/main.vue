<script setup lang="ts">

</script>

<template lang="pug">
#entry
  header
    router-link(
      :to='{ name: "home" }'
    )
  main
    router-view
</template>

<style scoped lang="sass">
#entry
  max-width: 48em
  margin: auto
</style>
