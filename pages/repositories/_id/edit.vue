<template>
  <Page id="Edit">
    <template #head>
      <PageHeader>
        <template #title>Create Repository</template>
        <template #actions>
          <v-switch
            v-model="data.isPublic"
            :label="data.isPublic ? 'Public article' : 'Private article'"
            class="switch"
            inset
          />
          <v-btn
            v-tooltip.bottom-start="'Update repository.'"
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
              v-model="data.name"
              :rules="rules.name"
              :counter="25"
              label="Repository name"
              outlined
            />
            <v-text-field
              v-model="data.cite"
              :rules="rules.cite"
              :counter="100"
              placeholder="https://....."
              label="Link to official site of repository"
              outlined
            />
            <v-text-field
              v-model="data.gitHub"
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
              v-model="data.language"
              :items="Object.keys(languages)"
              label="Stack languages"
              outlined
            >
            </v-select>
            <v-select
              v-model="data.technology"
              :items="technologies"
              label="Stack technologies"
              outlined
            >
            </v-select>
            <v-textarea
              v-model="data.about"
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
/**
 * ---(repositories/_id/edit.vue)--- Basic view of repository. If user logged in, he can add or remove repository to his list
 */
import { fetchRepositoryByID, updateRepository } from '~/functions/repositories'

import { fetchCategories } from '~/functions/language-technologies'

/**
 * ---(repositories/_id/edit.vue)--- Page for editing article
 * @module pages/repositories/_id/edit
 *
 * @vue-event {Object(route, error)} asyncData - Return ['fetchRepositoryByID']{@link external:functions_repositories}, and ['fetchCategories']{@link external:functions_language_technologies}
 * @vue-data {Object} rules                    - rules for inputs
 * @vue-computed {Boolean} formIsValid         - Controls ability to update repository
 * @vue-event {data} save                      - Update repository, by ['updateRepository']{@link external:functions_repositories}.
 */
export default {
  name: 'Edit',
  async asyncData({ error, route }) {
    const data = await fetchRepositoryByID(route.params.id)
    try {
      return {
        data,
        oldData: Object.assign({}, data),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch repository." })
    }
  },

  data() {
    return {
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
        !!this.data.name &&
        this.data.name.length <= 25 &&
        /https:\/\/github.com\/.+/.test(this.data.gitHub) &&
        this.data.cite.length <= 200 &&
        JSON.stringify(this.data) !== JSON.stringify(this.oldData)
      )
    },
    technologies() {
      try {
        const technologies = []
        this.languages[this.data.language].technologies.forEach((item) => {
          technologies.push(item)
        })
        return technologies
      } catch (e) {
        return []
      }
    }
  },
  watch: {
    'data.language'() {
      this.data.technology = ''
    }
  },
  methods: {
    async save() {
      try {
        const gitApiKey = `https://api.github.com/repos/${
          this.data.gitHub.split(`https://github.com/`)[1]
        }`
        await this.$axios.get(`${gitApiKey}`)
        const updatedData = {
          name: this.data.name,
          about: this.data.about,
          cite: this.data.cite,
          gitHub: this.data.gitHub,
          gitApiKey,
          language: this.data.language,
          technology: this.data.technology,
          isPublic: this.data.isPublic,
          creatorName: this.data.creatorName,
          creatorId: this.data.creatorId
        }
        await updateRepository(updatedData, this.$route.params.id)
        this.$dialog.message.success(`Updated Repository: ${this.data.name}`, {
          position: 'top-right',
          timeout: 5000
        })
        this.$router.push(`/repositories/${this.$route.params.id}`)
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
