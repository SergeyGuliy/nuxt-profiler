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
      <input v-model="name" type="text" placeholder="name" />
      <br />
      <input v-model="about" type="text" placeholder="about" />
      <br />
      <input v-model="cite" type="text" placeholder="link" />
      <br />
      <button>SAVE</button>
    </form>
  </div>
</template>

<script>
import { createArticle } from '~/functions/articles'
export default {
  name: 'Create',
  data() {
    return {
      name: '',
      about: '',
      cite: '',
      accessibility: 'private'
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
      console.log(await createArticle(data))
      this.$router.push(`/${this.$store.getters.user.profile}/my_articles`)
    }
  }
}
</script>

<style scoped></style>
