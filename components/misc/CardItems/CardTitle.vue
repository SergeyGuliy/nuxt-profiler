<template>
  <span class="headline my-2 Title">
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
  margin: 4px auto !important
  span
    margin-bottom: 3px
</style>
