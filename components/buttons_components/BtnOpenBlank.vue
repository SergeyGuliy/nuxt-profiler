<template>
  <div class="BtnOpenBlank">
    <v-btn
      :href="linkFormated"
      link
      target="_blank"
      color="blue"
      small
      outlined
    >
      {{ text ? text : 'open' }}
      <v-icon dense class="mx-1">{{ icon ? icon : 'mdi-web' }}</v-icon>
    </v-btn>
    <span>{{ link.split('://')[1] || link }}</span>
  </div>
</template>

<script>
export default {
  name: 'BtnOpenBlank',
  props: { link: String, text: String, icon: String, type: String },
  computed: {
    linkFormated() {
      if (this.type === 'email') {
        return `mailto:${this.link}`
      } else if (this.type === 'tel') {
        return `tel:${this.link}`
      } else if (this.type === 'skype') {
        return `skype:${this.link}?call`
      } else {
        return this.link
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.Card .CardRow .BtnOpenBlank
  display: inline-block
  a, button
    padding: 0 5px
    letter-spacing: 0.7px
    height: 23px
  span
    display: none
    @media print
      display: inline-block
  .v-btn
    @media print
      display: none
</style>
