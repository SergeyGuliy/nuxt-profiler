<template>
  <v-btn @click="copy(copyValue)" class="BtnCopy" color="blue" small outlined>
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
      try {
        await this.$copyText(copiedText)
        this.$dialog.message.success(`Coppied: ${copiedText}`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(e)
      }
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
