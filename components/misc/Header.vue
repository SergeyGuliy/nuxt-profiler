<template>
  <span id="Title" class="headline my-2">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style lang="sass">
#Title
  display: block
  text-align: center
  margin: auto
  span
    margin-bottom: 3px
</style>
