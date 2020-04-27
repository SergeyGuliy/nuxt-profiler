<template>
  <div id="Error">
    <img src="~/static/error.png" alt="error_image" />
    <span class="display-2 font-weight-black">{{
      error.statusCode ? error.statusCode : '404'
    }}</span>
    <span class="display-1">{{
      error.message ? error.message : 'Page not Found'
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: { error: Object }
}
</script>

<style lang="sass">
#Error
  margin: 150px auto 0
  display: flex
  flex-direction: column
  align-items: center
  img
    height: 80px
    margin-bottom: 15px
</style>
