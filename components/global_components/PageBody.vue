<template>
  <div id="PageBody" :class="columnClass">
    <div v-if="col >= 1" class="c-1">
      <slot name="c-1" />
    </div>
    <div v-if="col >= 2" class="c-2">
      <slot name="c-2" />
    </div>
    <div v-if="col >= 3" class="c-3">
      <slot name="c-3" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageBody',
  props: { col: String },
  computed: {
    columnClass() {
      if (this.col === '1') {
        return 'grid-column-1'
      } else if (this.col === '2') {
        return 'grid-column-2'
      } else if (this.col === '3') {
        return 'grid-column-3'
      } else {
        return 'grid-column-1'
      }
    }
  }
}
</script>

<style lang="sass">
#PageBody
  height: 100%
  width: 100%
  display: grid
  grid-column-gap: 10px
  grid-row-gap: 10px
  .c-1
    grid-area: col-1
  .c-2
    grid-area: col-2
  .c-3
    grid-area: col-3
  .v-card
    height: 100%
    padding: 0 5px

#PageBody.grid-column-3
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
  grid-template-rows: 1fr
  grid-template-areas: 'col-1 col-1 col-2 col-2 col-3 col-3'
  @media screen and (max-width: 1150px)
    grid-template-rows: auto auto
    grid-template-areas: 'col-1 col-1 col-1 col-2 col-2 col-2' 'col-3 col-3 col-3 col-3 col-3 col-3'
  @media screen and (max-width: 740px)
    grid-template-rows: auto auto auto
    grid-template-areas: 'col-1 col-1 col-1 col-1 col-1 col-1' 'col-2 col-2 col-2 col-2 col-2 col-2' 'col-3 col-3 col-3 col-3 col-3 col-3'
  @media print
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
    grid-template-rows: auto
    grid-template-areas: 'col-1 col-1 col-1 col-1 col-1 col-1' 'col-2 col-2 col-2 col-2 col-2 col-2'
    grid-column-gap: 3px
    .c-3
      display: none

#PageBody.grid-column-2
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
  grid-template-rows: auto auto auto
  grid-template-areas: 'col-1 col-1 col-1 col-2 col-2 col-2' 'col-1 col-1 col-1 col-2 col-2 col-2'
  @media screen and (max-width: 850px)
    grid-template-areas: 'col-1 col-1 col-1 col-1 col-1 col-1' 'col-2 col-2 col-2 col-2 col-2 col-2'
  @media print
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
    grid-template-rows: auto
    grid-template-areas: 'col-1 col-1 col-1 col-2 col-2 col-2'
    grid-column-gap: 3px
    .c-3
      display: none

#PageBody.grid-column-1
  grid-template-columns: 1fr
  grid-template-rows: 1fr
  grid-template-areas: 'col-1'
</style>
