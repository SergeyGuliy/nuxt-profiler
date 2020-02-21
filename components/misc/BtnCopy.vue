<template>
  <v-btn @click="copy(copyValue)" color="blue" small outlined>
    Copy
    <v-icon dense class="mx-1">mdi-content-copy</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnCopy',
  props: ['copyValue'],
  methods: {
    async copy(copiedText) {
      try {
        await this.$copyText(copiedText)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
