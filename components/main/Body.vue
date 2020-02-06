<template>
  <v-content>
    <v-container class="fill-height" align-itemst-start>
      <slot></slot>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Body'
}
</script>

<style scoped lang="sass">
.container.fill-height
  align-items: start
</style>
