<template>
  <BodyCard>
    <template #head>
      <BodyCardHeader>
        <template #title>Create Repository</template>
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
                placeholder="https://github.com/....."
                label="Link to official site of repository"
                outlined
              />
              <v-text-field
                v-model="gitHub"
                :rules="rules.gitHub"
                :counter="100"
                placeholder="https://....."
                label="Link to repository"
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
import { createRepository } from '~/functions/repositories'
export default {
  name: 'Create',
  data() {
    return {
      name: '',
      about: '',
      cite: '',
      gitHub: '',
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
        gitHub: [
          (v) => !!v || 'Link is required',
          (v) =>
            /https:\/\/github.com\/.+/.test(v) ||
            'Link must starts with "https://github.com/"',
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
        /https:\/\/.+/.test(this.cite) &&
        /https:\/\/github.com\/.+/.test(this.gitHub) &&
        this.cite.length <= 200
      )
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
        gitHub: this.gitHub,
        isPublic: this.isPublic,
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

<style scoped lang="sass">
.container.container--fluid
  height: 36px
  padding: 0
  .v-input
    margin: 3px
</style>
