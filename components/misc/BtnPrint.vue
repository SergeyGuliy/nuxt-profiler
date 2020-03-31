<template>
  <v-btn @click="print" v-tooltip.bottom-start="'Print page.'" color="blue">
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
