<template>
  <v-btn :to="link" text exact-active-class="outlined">
    <span id="NavLink">
      <slot />
    </span>
  </v-btn>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    link: String
  }
}
</script>

<style lang="sass">
span#NavLink
  font-size: 14px
  letter-spacing: 1px
  font-weight: 400
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
</style>
