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
              @keypress.enter="addLanguage"
              :counter="20"
              :rules="rules.lang"
              label="Language"
              outlined
            />
            <v-btn
              @click="addLanguage"
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
              >ADD language</v-btn
            >
            <v-list>
              <v-list-item
                v-for="item in languages"
                :key="item.name"
                @click="selectLanguage(item)"
                :class="{ activeLang: item === languageSelected }"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn @click.stop="deleteLanguage(item)" icon>
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
              @keypress.enter="addTechnology"
              :counter="20"
              :rules="rules.tech"
              :disabled="!languageSelected"
              :label="
                languageSelected
                  ? `Technologie for ${languageSelected.name}`
                  : `Select language`
              "
              outlined
            />
            <v-btn
              :disabled="
                !(newTechnology.length >= 2 && newTechnology.length <= 20) ||
                  loading
              "
              @click="addTechnology"
              :loading="loading"
              color="green"
              block
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
                  <v-btn @click="deleteTechnology(item)" icon>
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
export default {
  name: 'MyAdminPanel',
  head: {
    title: `Profiler - Admin Panel`
  },
  validate({ store }) {
    return store.getters.user.isAdmin
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
  middleware: 'isNotAdmin',
  async asyncData({ error }) {
    try {
      return {
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch languages/technologies list." })
    }
  },
  methods: {
    async save() {
      this.loading = true
      try {
        await updateCategories(this.languages)
      } catch (e) {
        throw e
      } finally {
        this.loading = false
      }
    },
    selectLanguage(item) {
      if (item && !item.technologies) {
        this.$set(item, 'technologies', [])
      }
      this.languageSelected = item
    },
    async addLanguage() {
      try {
        if (this.languages[this.newLanguage]) {
          this.$dialog.message.error(
            `There is already ${this.newLanguage} in list of languages`,
            {
              position: 'top-right',
              timeout: 3000
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
            timeout: 3000
          }
        )
        await this.save()
        this.newLanguage = ''
      } catch (e) {
        console.log(e.message)
        this.$dialog.message.error(`${e.message}`, {
          position: 'top-right',
          timeout: 3000
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
        timeout: 3000
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
            timeout: 3000
          }
        )
        return
      }
      this.languageSelected.technologies.push(this.newTechnology)
      this.$dialog.message.success(
        `Created new technology ${this.newTechnology}`,
        {
          position: 'top-right',
          timeout: 3000
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
        timeout: 3000
      })
      this.languageSelected.technologies.splice(id, 1)
      await this.save()
    }
  }
}
</script>
