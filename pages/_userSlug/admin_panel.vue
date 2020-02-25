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
              label="Language"
              outlined
            />
            <v-btn
              @click="addLanguage"
              :disabled="!newLanguage || loading"
              :loading="loading"
              block
              >ADD language</v-btn
            >
            <v-list>
              <v-list-item
                v-for="item in languages"
                :key="item.name"
                @click="selectLanguage(item)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn @click.stop="deleteLanguage(item)" icon>
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
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
              :label="
                languageSelected
                  ? `Technologie for ${languageSelected.name}`
                  : `Technologie`
              "
              outlined
            />
            <v-btn
              :disabled="!newTechnology || !languageSelected || loading"
              @click="addTechnology"
              :loading="loading"
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
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
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
      newLanguage: null,
      newTechnology: null,
      languageSelected: null,
      loading: false
    }
  },
  watch: {
    languages: {
      deep: true,
      handler: 'save'
    }
  },
  async asyncData() {
    try {
      return {
        languages: await fetchCategories()
      }
    } catch (e) {}
  },
  methods: {
    async save() {
      this.loading = true
      try {
        await updateCategories(this.languages)
      } catch (e) {}
      this.loading = false
    },
    selectLanguage(item) {
      if (item && !item.technologies) {
        this.$set(item, 'technologies', [])
      }
      this.languageSelected = item
    },
    addLanguage() {
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
      this.$dialog.message.success(`Created new language ${this.newLanguage}`, {
        position: 'top-right',
        timeout: 3000
      })
      this.newLanguage = ''
    },
    deleteLanguage(language) {
      this.languageSelected = language.name
      if (this.languageSelected === language.name) {
        this.languageSelected = ''
      }
      this.$dialog.message.error(`Deleted language: ${language.name}`, {
        position: 'top-right',
        timeout: 3000
      })
      this.$delete(this.languages, language.name)
    },
    addTechnology() {
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
      this.newTechnology = ''
    },
    deleteTechnology(technology) {
      const id = this.languageSelected.technologies.findIndex((index) => {
        return index === technology
      })
      this.$dialog.message.error(`Deleted technology: ${technology}`, {
        position: 'top-right',
        timeout: 3000
      })
      this.languageSelected.technologies.splice(id, 1)
    }
  }
}
</script>

<style lang="sass">
#adminPanel
  button.v-btn.v-btn--block
    margin-bottom: 15px
</style>
