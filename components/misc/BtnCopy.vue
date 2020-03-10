<template>
  <v-btn @click="copy(copyValue)" color="blue" small outlined>
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
          timeout: 3000
        })
      } catch (e) {}
    }
  }
}
</script>
