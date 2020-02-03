<template>
  <div>
    <h1>USER #{{ $route.params.userSlug }} CREATING REPOSITORY</h1>
    <form @submit.prevent="save">
      <div>
        <input
          id="private"
          v-model="accessibility"
          type="radio"
          value="private"
        />
        <label for="private">PRIVATE</label>
        <input
          id="public"
          v-model="accessibility"
          type="radio"
          value="public"
        />
        <label for="public">PUBLIC</label>
      </div>
      <input type="text" placeholder="name" />
      <br />
      <input type="text" placeholder="about" />
      <br />
      <input type="text" placeholder="link" />
      <br />
      <input type="text" placeholder="gitHub link" />
      <br />
      <button>SAVE</button>
    </form>
  </div></template
>

<script>
import { createRepository } from '~/functions/repositories'
export default {
  name: 'Create',
  data() {
    return {
      name: '',
      about: '',
      cite: '',
      accessibility: ''
    }
  },
  methods: {
    async save() {
      const data = {
        name: this.name,
        about: this.about,
        cite: this.cite,
        accessibility: this.accessibility,
        creatorName: this.$store.getters.user.profile,
        creatorId: this.$store.getters.user.id
      }
      const id = await createRepository(data)
      this.$store.commit('pushRepository', id)
      await this.$store.dispatch('updateUserInfo')
      this.$router.push(
        `/${this.$store.getters.user.profile}/my_rerepositories`
      )
    }
  }
}
</script>

<style scoped></style>
