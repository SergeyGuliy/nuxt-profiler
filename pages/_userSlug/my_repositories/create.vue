<template>
  <Page id="createRepository">
    <template #head>
      <PageHeader>
        <template #title>Create Repository</template>
        <template #actions>
          <v-switch
            v-model="isPublic"
            :label="isPublic ? 'Public article' : 'Private article'"
            class="switch"
            inset
          />
          <v-btn @click="save" :disabled="!formIsValid" class="mx-1"
            >Save</v-btn
          >
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
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
              label="Link to official site of repository"
              outlined
            />
            <v-text-field
              v-model="gitHub"
              :rules="rules.gitHub"
              :counter="100"
              placeholder="https://github.com/....."
              label="Link to repository"
              outlined
            />
          </Card>
        </template>
        <template #c-2>
          <Card>
            <v-select
              :items="Object.keys(languages)"
              v-model="language"
              label="Stack languages"
              outlined
            >
            </v-select>
            <v-select
              :items="technologies"
              v-model="technology"
              label="Stack technologies"
              outlined
            >
            </v-select>
            <v-textarea
              v-model="about"
              :rules="rules.about"
              :counter="200"
              label="Description"
              outlined
            />
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { createRepository } from '~/functions/repositories'
import { fetchCategories } from '~/functions/language-technologies'
export default {
  name: 'Create',
  data() {
    return {
      name: '',
      about: '',
      cite: '',
      gitHub: '',
      language: '',
      technology: '',
      isPublic: false,
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 15 || 'Name must be less than 15 characters'
        ],
        cite: [
          (v) => !!v || 'Link is required',
          (v) => /https:\/\/.+/.test(v) || 'Link must starts with "https://"',
          (v) => v.length <= 200 || 'Link must be less than 200 characters'
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
        /https:\/\/github.com\/.+/.test(this.gitHub) &&
        this.cite.length <= 200
      )
    },
    technologies() {
      try {
        const technologies = []
        this.languages[this.language].technologies.forEach((item) => {
          technologies.push(item)
        })
        return technologies
      } catch (e) {
        return []
      }
    }
  },
  watch: {
    language() {
      this.technology = ''
    }
  },
  async asyncData() {
    return {
      languages: await fetchCategories()
    }
  },
  head: {
    title: `Profiler - Create Repository`
  },
  methods: {
    async save() {
      try {
        const gitApiKey = this.gitHub.split(`https://github.com/`)[1]
        const gitApi = await this.$axios.get(
          `https://api.github.com/repos/${gitApiKey}`
        )
        const data = {
          name: this.name,
          about: this.about,
          cite: this.cite,
          gitHub: this.gitHub,
          gitApi,
          language: this.language,
          technology: this.technology,
          isPublic: this.isPublic,
          creatorName: this.$store.getters.user.profile,
          creatorId: this.$store.getters.user.id
        }
        const id = await createRepository(data)
        this.$store.commit('pushRepository', id)
        await this.$store.dispatch('updateUserInfo')
        this.$router.push(
          `/${this.$store.getters.user.profile}/my_repositories`
        )
      } catch (e) {
        if (e.message === 'Request failed with status code 404') {
          alert('Cannot access to git repository')
        }
      }
    }
  }
}
</script>

<style lang="sass">
#createRepository
  .v-input.switch
    margin: 3px
    height: 36px
</style>
