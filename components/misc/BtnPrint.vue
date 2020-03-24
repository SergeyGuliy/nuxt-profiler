<template>
  <v-btn @click="print" color="blue">
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
