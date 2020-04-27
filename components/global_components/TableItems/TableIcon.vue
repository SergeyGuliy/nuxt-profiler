<template>
  <v-btn :color="color" icon @click="action(item)">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'TableIcon',
  props: { color: String, icon: String, item: String, action: Function }
}
</script>

<style scoped lang="sass">
.v-btn.v-btn--icon.v-btn--flat.v-size--default
  width: 24px !important
  height: 25px !important
  .v-btn__content
    width: 24px !important
    height: 25px !important
</style>
