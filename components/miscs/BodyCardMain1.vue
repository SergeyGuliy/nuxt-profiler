<template
  ><div class="grid">
    <div class="c-1">
      <v-card color="#385F73" dark>
        <slot name="c-1"></slot>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BodyCardMain1'
}
</script>

<style scoped lang="sass">
.grid
  display: grid
  width: 100%
  grid-column-gap: 15px
  grid-row-gap: 15px
  grid-template-columns: 1fr
  grid-template-rows: 1fr
  grid-template-areas: 'col-1'
.c-1
  grid-area: col-1
</style>
