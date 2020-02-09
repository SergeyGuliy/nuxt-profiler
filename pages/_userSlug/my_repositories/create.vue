<!--<template>-->
<!--  <div>-->
<!--    <h1>USER #{{ $route.params.userSlug }} CREATING REPOSITORY</h1>-->
<!--    <form @submit.prevent="save">-->
<!--      <div>-->
<!--        <input-->
<!--          id="private"-->
<!--          v-model="accessibility"-->
<!--          type="radio"-->
<!--          value="private"-->
<!--        />-->
<!--        <label for="private">PRIVATE</label>-->
<!--        <input-->
<!--          id="public"-->
<!--          v-model="accessibility"-->
<!--          type="radio"-->
<!--          value="public"-->
<!--        />-->
<!--        <label for="public">PUBLIC</label>-->
<!--      </div>-->
<!--      <input v-model="name" type="text" placeholder="name" />-->
<!--      <br />-->
<!--      <input v-model="about" type="text" placeholder="about" />-->
<!--      <br />-->
<!--      <input v-model="cite" type="text" placeholder="link" />-->
<!--      <br />-->
<!--      <input v-model="gitHub" type="text" placeholder="gitHub link" />-->
<!--      <br />-->
<!--      <button>SAVE</button>-->
<!--    </form>-->
<!--  </div>-->
<!--</template>-->
<template>
  <BodyCard>
    <template #head>
      <BodyCardHeader>
        <template #title>Create Repository</template>
        <div class="flex">
          <v-btn class="mx-1">Save</v-btn>
        </div>
      </BodyCardHeader>
    </template>
    <template #body>
      <BodyCardMain2>
        <template #c-1>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <template #c-2>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </BodyCardMain2>
    </template>
  </BodyCard>
</template>

<script>
import { createRepository } from '~/functions/repositories'
export default {
  name: 'Create',
  data() {
    return {
      name: '',
      about: '',
      cite: '',
      gitHub: '',
      accessibility: 'private'
    }
  },
  head: {
    title: `Profiler - Create Repository`
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
      this.$router.push(`/${this.$store.getters.user.profile}/my_repositories`)
    }
  }
}
</script>

<style scoped></style>
