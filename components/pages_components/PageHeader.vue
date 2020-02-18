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
  .flex-left
    display: flex
    align-items: center
</style>
