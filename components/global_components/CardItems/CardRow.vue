<template>
  <div class="CardRow">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardRow'
}
</script>

<style lang="sass">
.CardRow
  display: flex
  min-height: 27px
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  p
    margin: 0 5px 5px 5px
</style>
