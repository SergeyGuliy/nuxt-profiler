<template>
  <div id="BtnOpenBlank">
    <v-btn :href="link" link target="_blank" color="blue" small outlined>
      {{ text ? text : 'open' }}
      <v-icon dense class="mx-1">{{ icon ? icon : 'mdi-web' }}</v-icon>
    </v-btn>
    <span>{{ link }}</span>
  </div>
</template>

<script>
export default {
  name: 'BtnOpenBlank',
  props: { link: String, text: String, icon: String }
}
</script>

<style lang="sass" scoped>
#BtnOpenBlank
  display: inline-block
  span
    display: none
    @media print
      display: inline-block
  .v-btn
    @media print
      display: none
</style>
