<template>
  <Page id="Edit">
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
          <v-btn
            v-tooltip.bottom-start="'Create repository.'"
            class="headerButton"
            outlined
            :disabled="!formIsValid"
            color="green"
            @click="save"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
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
              :counter="25"
              label="Repository name"
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
              v-model="language"
              :items="Object.keys(languages)"
              label="Stack languages"
              outlined
            >
            </v-select>
            <v-select
              v-model="technology"
              :items="technologies"
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
              auto-grow
              rows="1"
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

/**
 * ---(_userSlug/my_repositories/create.vue)--- Page witch can create new article.
 * @module pages/_userSlug/my_repositories/create
 *
 * @vue-event {context(error)} asyncData    - return ['fetchCategories']{@link external:functions_language_technologies}
 * @vue-data {string} name                  - Name of new repository
 * @vue-data {string} about                 - About of new repository
 * @vue-data {string} cite                  - Cite link of new repository
 * @vue-data {string} gitHub                - gitHub link of new repository
 * @vue-data {string} language              - Language of new repository
 * @vue-data {string} technology            - Technology of new repository
 * @vue-data {Boolean} isPublic             - Flag with will controls logic of is public will be repository
 * @vue-data {Object} rules                 - rules for inputs
 * @vue-computed {Boolean} formIsValid      - Controls ability to create new repository
 * @vue-event {data} save                   - Create new repository, by ['createRepository']{@link external:functions_repositories}. And adds repository id to my list by action ['updateReposList']{@link external:store_repositories}
 */
export default {
  name: 'Create',
  async asyncData({ error }) {
    try {
      return {
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch your data." })
    }
  },
  data() {
    return {
      // ---------------------------Created for testing--------------------------------------------
      languages: {},
      // ---------------------------Created for testing--------------------------------------------
      name: '',
      about: '',
      cite: '',
      gitHub: '',
      language: '',
      technology: '',
      isPublic: true,
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 25 || 'Name must be less than 25 characters'
        ],
        cite: [
          (v) => !!v || 'Link is required',
          (v) => /http.+/.test(v) || 'Link must starts with "http"',
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
        this.name.length <= 25 &&
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
  methods: {
    async save() {
      try {
        const gitApiKey = `https://api.github.com/repos/${
          this.gitHub.split(`https://github.com/`)[1]
        }`
        await this.$axios.get(`${gitApiKey}`)
        const data = {
          name: this.name,
          about: this.about,
          cite: this.cite,
          gitHub: this.gitHub,
          gitApiKey,
          language: this.language,
          technology: this.technology,
          isPublic: this.isPublic,
          creatorName: this.$store.getters.profile,
          creatorId: this.$store.getters.id
        }
        const id = await createRepository(data)
        await this.$store.dispatch('repositories/updateReposList', {
          type: 'add',
          id
        })
        this.$dialog.message.success(`Created Repository: ${this.name}`, {
          position: 'top-right',
          timeout: 5000
        })
        this.$router.push(`/${this.$store.getters.profile}/my_repositories`)
      } catch (e) {
        if (e.message === 'Request failed with status code 404') {
          this.$dialog.message.error(
            `Error while trying to connect to repository. Check link to repository.`,
            {
              position: 'top-right',
              timeout: 5000
            }
          )
        }
        console.log(`Error in creation new article: ${e}`)
      }
    }
  },
  head: {
    title: `Profiler - Create Repository`
  }
}
</script>

<style lang="sass">
#Edit
  .v-input.switch
    margin: 0 5px 0 0
    height: 32px
    .v-input__control
      height: 32px
      .v-input__slot
        margin: 0
</style>
