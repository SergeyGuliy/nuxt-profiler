<template>
  <div id="PageHeader">
    <h3 class="headline">
      <slot name="title" />
    </h3>
    <div class="flex-left">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BodyCardTitle'
}
</script>

<style lang="sass">
#PageHeader
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  min-height: 44px
  flex-wrap: wrap
  @media print
    margin: 0!important
    min-height: 15px
    max-height: 15px
  .title-chip
    margin: 2px
    padding: 0 5px
    height: 25px
    @media print
      display: none
  .flex-left
    display: flex
    align-items: center
    justify-content: flex-end
    @media print
      display: none
  .v-chip
    @media print
      display: none
  h3.headline
    font-size: 20px !important
    letter-spacing: 1px !important
    text-transform: capitalize
    @media screen and (max-width: 700px)
      font-size: 18px !important
      letter-spacing: 0.9px !important
    @media screen and (max-width: 510px)
      font-size: 16px !important
      letter-spacing: 0.8px !important
    @media screen and (max-width: 450px)
      font-size: 14px !important
      letter-spacing: 0.7px !important
</style>
