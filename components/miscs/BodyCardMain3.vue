<template
  ><div class="grid">
    <div class="c-1">
      <v-card color="#385F73" dark>
        <slot name="c-1"></slot>
      </v-card>
    </div>
    <div class="c-2">
      <v-card color="#385F73" dark>
        <slot name="c-2"></slot>
      </v-card>
    </div>
    <div class="c-3">
      <v-card color="#385F73" dark>
        <slot name="c-3"></slot>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BodyCardMain3'
}
</script>

<style scoped lang="sass">
.grid
  display: grid
  grid-column-gap: 15px
  grid-row-gap: 15px
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
  grid-template-rows: 1fr 1fr 1fr
  grid-template-areas: 'col-1 col-1 col-2 col-2 col-3 col-3' 'col-1 col-1 col-2 col-2 col-3 col-3' 'col-1 col-1 col-2 col-2 col-3 col-3'
  @media screen and (max-width: 1150px)
    grid-template-areas: 'col-1 col-1 col-1 col-2 col-2 col-2'  'col-1 col-1 col-1 col-2 col-2 col-2' 'col-3 col-3 col-3 col-3 col-3 col-3'
  @media screen and (max-width: 740px)
    grid-template-areas: 'col-1 col-1 col-1 col-1 col-1 col-1' 'col-2 col-2 col-2 col-2 col-2 col-2' 'col-3 col-3 col-3 col-3 col-3 col-3'
.c-1
  grid-area: col-1
.c-2
  grid-area: col-2
.c-3
  grid-area: col-3
.v-card
  height: 100%
</style>
