<template>
  <v-btn
    @click="copyLink"
    v-tooltip.bottom-start="'Copy link to page.'"
    color="green"
    class="mx-1"
  >
    <v-icon>mdi-share-variant</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnShare',
  props: { link: String },
  methods: {
    async copyLink() {
      try {
        await this.$copyText(`${window.location.origin}/${this.link}`)
        this.$dialog.message.success(
          `Coppied: '${window.location.origin}/${this.link}'`,
          {
            position: 'top-right',
            timeout: 3000
          }
        )
      } catch (e) {}
    }
  }
}
</script>
