<template>
  <div class="flex">
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

<style scoped lang="sass">
.flex
  display: flex
  justify-content: space-between
  align-items: center
.flex-left
  display: flex
  align-items: center
</style>
