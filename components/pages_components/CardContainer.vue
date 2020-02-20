<template>
  <div id="CardContainer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardContainer'
}
</script>

<style lang="sass">
#CardContainer
  display: flex
  min-height: 29px
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  a, button
    padding: 0 5px
    letter-spacing: 0.7px
    height: 23px
  p
    margin: 0 5px 5px 5px
</style>
