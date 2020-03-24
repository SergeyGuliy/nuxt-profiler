<template>
  <v-btn
    id="NavLink"
    :to="link"
    :class="{ 'full-width': sidebar }"
    text
    exact-active-class="outlined"
  >
    <span>
      <slot />
    </span>
  </v-btn>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    link: String,
    sidebar: Boolean
  }
}
</script>

<style lang="sass">
#NavLink
  margin: 0 2px
  span
    font-size: 14px
    letter-spacing: 1px
    font-weight: 400
    width: 100%
    @media screen and (max-width: 700px)
      font-size: 12px
      letter-spacing: 0.9px
      font-weight: 400
    @media screen and (max-width: 510px)
      font-size: 9px
      letter-spacing: 0.8px
      font-weight: 400
    @media screen and (max-width: 450px)
      font-size: 8.5px
      letter-spacing: 0.7px
      font-weight: 400

  .full-width
    width: 100%
</style>
