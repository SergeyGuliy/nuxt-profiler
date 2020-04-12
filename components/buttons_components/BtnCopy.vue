<template>
  <v-btn class="BtnCopy" color="blue" small outlined @click="copy(copyValue)">
    Copy
    <v-icon dense class="mx-1">mdi-content-copy</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnCopy',
  props: { copyValue: String },
  methods: {
    async copy(copiedText) {
      await this.$copyText(copiedText)
      this.$dialog.message.success(`Coppied: ${copiedText}`, {
        position: 'top-right',
        timeout: 5000
      })
    }
  }
}
</script>

<style lang="sass">
.Card .CardRow .BtnCopy
  padding: 0 5px
  letter-spacing: 0.7px
  height: 23px
  @media print
    display: none
</style>
