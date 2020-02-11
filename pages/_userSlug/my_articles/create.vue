<template>
  <BodyCard>
    <template #head>
      <BodyCardHeader>
        <template #title>Create Article</template>
        <div class="flex">
          <v-container fluid>
            <v-switch
              v-model="isPublic"
              :label="isPublic ? 'Public article' : 'Private article'"
              inset
            />
          </v-container>
          <v-btn @click="save" :disabled="!formIsValid" class="mx-1"
            >Save</v-btn
          >
        </div>
      </BodyCardHeader>
    </template>
    <template #body>
      <BodyCardMain2>
        <template #c-1>
          <v-card color="#385F73" dark>
            <v-card-subtitle>
              <v-text-field
                v-model="name"
                :rules="rules.name"
                :counter="15"
                label="Article name"
                outlined
              />
              <v-text-field
                v-model="cite"
                :rules="rules.cite"
                :counter="100"
                placeholder="https://....."
                label="Link to article"
                outlined
              />
            </v-card-subtitle>
          </v-card>
        </template>
        <template #c-2>
          <v-card color="#385F73" dark>
            <v-card-subtitle>
              <v-textarea
                v-model="about"
                :rules="rules.about"
                :counter="200"
                label="Description"
                outlined
              />
            </v-card-subtitle>
          </v-card>
        </template>
      </BodyCardMain2>
    </template>
  </BodyCard>
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
      isPublic: false,
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 15 || 'Name must be less than 10 characters'
        ],
        cite: [
          (v) => !!v || 'Link is required',
          (v) => /https:\/\/.+/.test(v) || 'Link must starts with "https://"',
          (v) => v.length <= 200 || 'Link must be less than 100 characters'
        ],
        about: [
          (v) =>
            v.length <= 200 || 'Description must be less than 200 characters'
        ]
      }
    }
  },
  computed: {
    formIsValid() {
      return (
        !!this.name &&
        this.name.length <= 15 &&
        /https:\/\/github.com\/.+/.test(this.cite) &&
        this.cite.length <= 200
      )
    }
  },
  head: {
    title: `Profiler - Create Article`
  },
  methods: {
    async save() {
      const data = {
        name: this.name,
        about: this.about,
        cite: this.cite,
        isPublic: this.isPublic,
        creatorName: this.$store.getters.user.profile,
        creatorId: this.$store.getters.user.id
      }
      const id = await createArticle(data)
      this.$store.commit('pushArticle', id)
      await this.$store.dispatch('updateUserInfo')
      this.$router.push(`/${this.$store.getters.user.profile}/my_articles`)
    }
  }
}
</script>

<style scoped lang="sass">
.container.container--fluid
  height: 36px
  padding: 0
  .v-input
    margin: 3px
</style>
