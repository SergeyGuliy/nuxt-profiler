<template>
  <Page id="adminPanel">
    <template #head>
      <PageHeader>
        <template #title>Admin Panel</template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <v-text-field
              v-model="newLanguage"
              :counter="20"
              :rules="rules.lang"
              label="Language"
              outlined
              @keypress.enter="addLanguage"
            />
            <v-btn
              :disabled="
                !(newLanguage.length >= 1 && newLanguage.length <= 20) ||
                  newLanguage.includes('.') ||
                  newLanguage.includes('#') ||
                  newLanguage.includes('$') ||
                  newLanguage.includes('/') ||
                  newLanguage.includes('[') ||
                  newLanguage.includes(']')
              "
              :loading="loading"
              block
              color="green"
              @click="addLanguage"
              >ADD language</v-btn
            >
            <v-list>
              <v-list-item
                v-for="item in languages"
                :key="item.name"
                :class="{ activeLang: item === languageSelected }"
                @click="selectLanguage(item)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click.stop="deleteLanguage(item)">
                    <v-icon color="warning lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <v-text-field
              v-model="newTechnology"
              :counter="20"
              :rules="rules.tech"
              :disabled="!languageSelected"
              :label="
                languageSelected
                  ? `Technologie for ${languageSelected.name}`
                  : `Select language`
              "
              outlined
              @keypress.enter="addTechnology"
            />
            <v-btn
              :disabled="
                !(newTechnology.length >= 2 && newTechnology.length <= 20) ||
                  loading
              "
              :loading="loading"
              color="green"
              block
              @click="addTechnology"
              >ADD technology</v-btn
            >
            <v-list v-if="languageSelected">
              <v-list-item
                v-for="item in languageSelected.technologies"
                :key="item"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="deleteTechnology(item)">
                    <v-icon color="warning lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import {
  fetchCategories,
  updateCategories
} from '~/functions/language-technologies'

/**
 * ---(_userSlug/admin_panel.vue)--- Page witch gives ability to manage languages and technologies
 * @module pages/_userSlug/admin_panel
 *
 * @vue-event {context(error)} asyncData    - Call ['fetchCategories']{@link external:functions_language_technologies}
 * @vue-data {string} newLanguage           - New language value
 * @vue-data {string} newTechnology         - New technology value
 * @vue-data {string} languageSelected      - Flag for selected language
 * @vue-data {Object} rules                 - rules for inputs
 * @vue-event {data} save                   - Push new languages, technologies to database by ['updateCategories']{@link external:functions_language_technologies}
 * @vue-event {data} selectLanguage         - Change flag of 'languageSelected', to target of action
 * @vue-event {data} addLanguage            - Create new language.
 * @vue-event {data} deleteLanguage         - Delete target language.
 * @vue-event {data} addTechnology          - Create new technology for 'languageSelected'.
 * @vue-event {data} deleteTechnology       - Delete target technology.
 */
export default {
  name: 'MyAdminPanel',
  async asyncData({ error }) {
    try {
      return {
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch languages/technologies list." })
    }
  },
  data() {
    return {
      newLanguage: '',
      newTechnology: '',
      languageSelected: null,
      loading: false,
      rules: {
        lang: [
          (v) => v.length <= 20 || 'Language must be less than 10 characters',
          (v) =>
            !(
              v.includes('.') ||
              v.includes('#') ||
              v.includes('$') ||
              v.includes('/') ||
              v.includes('[') ||
              v.includes(']')
            ) || 'Language can\'t contain ".", "#", "$", "/", "[", or "]"'
        ],
        tech: [
          (v) => v.length <= 20 || 'Technology must be less than 10 characters'
        ]
      }
    }
  },
  methods: {
    selectLanguage(item) {
      if (item && !item.technologies) {
        this.$set(item, 'technologies', [])
      }
      this.languageSelected = item
    },
    async save() {
      this.loading = true
      try {
        await updateCategories(this.languages)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async addLanguage() {
      try {
        if (this.languages[this.newLanguage]) {
          this.$dialog.message.error(
            `There is already ${this.newLanguage} in list of languages`,
            {
              position: 'top-right',
              timeout: 5000
            }
          )
          return
        }
        this.$set(this.languages, this.newLanguage, {
          name: this.newLanguage,
          technologies: []
        })
        this.$dialog.message.success(
          `Created new language ${this.newLanguage}`,
          {
            position: 'top-right',
            timeout: 5000
          }
        )
        await this.save()
        this.newLanguage = ''
      } catch (e) {
        this.$dialog.message.error(`${e.message}`, {
          position: 'top-right',
          timeout: 5000
        })
      }
    },
    async deleteLanguage(language) {
      this.languageSelected = language.name
      if (this.languageSelected === language.name) {
        this.languageSelected = ''
      }
      this.$dialog.message.error(`Deleted language: ${language.name}`, {
        position: 'top-right',
        timeout: 5000
      })
      this.$delete(this.languages, language.name)
      await this.save()
    },
    async addTechnology() {
      if (this.languageSelected.technologies.includes(this.newTechnology)) {
        this.$dialog.message.error(
          `There is already ${this.newTechnology} in list of technologies`,
          {
            position: 'top-right',
            timeout: 5000
          }
        )
        return
      }
      this.languageSelected.technologies.push(this.newTechnology)
      this.$dialog.message.success(
        `Created new technology ${this.newTechnology}`,
        {
          position: 'top-right',
          timeout: 5000
        }
      )
      await this.save()
      this.newTechnology = ''
    },
    async deleteTechnology(technology) {
      const id = this.languageSelected.technologies.findIndex((index) => {
        return index === technology
      })
      this.$dialog.message.error(`Deleted technology: ${technology}`, {
        position: 'top-right',
        timeout: 5000
      })
      this.languageSelected.technologies.splice(id, 1)
      await this.save()
    }
  },
  head: {
    title: `Profiler - Admin Panel`
  },
  validate({ store }) {
    return store.getters.isAdmin
  },
  mounted() {
    console.log(this.allArticles)
  },
  middleware: 'isNotAdmin'
}
</script>

<style lang="sass">
#adminPanel
  button.v-btn.v-btn--block
    margin-bottom: 15px
  .activeLang.theme--light
    background-color: #e0e0e0
    border-radius: 10px
  .activeLang.theme--dark
    background-color: #393939
    border-radius: 10px
</style>
