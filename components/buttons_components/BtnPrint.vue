<template>
  <v-btn
    v-tooltip.bottom-start="'Print page.'"
    color="blue"
    outlined
    class="headerButton"
    @click="print"
  >
    <v-icon>mdi-printer</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnPrint',
  methods: {
    print() {
      window.print()
    }
  }
}
</script>
