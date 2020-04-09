<template>
  <span class="my-2 Title">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style lang="sass">
#PageBody .Title
  display: block
  text-align: center
  margin: 0 auto !important
  font-size: 18px
  letter-spacing: -0.5px
  span
    margin-bottom: 3px
</style>
