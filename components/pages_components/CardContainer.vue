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
  height: 28px
  justify-content: space-between
  align-items: center
  margin-bottom: 6px
  a, button
    padding: 0 5px
    letter-spacing: 0.7px
    max-width: 240px
    height: 23px
</style>
