<template>
  <Page>
    <template #head>
      <PageHeader>
        <template #title>List of my Articles</template>
        <template #actions>
          <v-btn class="mx-1">Save</v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <v-card-subtitle>
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
                >ADD</v-btn
              >
              <v-list>
                <v-list-item
                  v-for="item in languages"
                  :key="item.name"
                  @click="selectLanguage(item)"
                  :class="{ my_active: item.name === languageSelected }"
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
            </v-card-subtitle>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <v-card-subtitle>
              <v-text-field
                v-model="newTechnology"
                @keypress.enter="addTechnology"
                label="Technologie"
                outlined
              />
              <v-btn
                :disabled="!newTechnology || !languageSelected || loading"
                @click="addTechnology"
                :loading="loading"
                block
                >ADD</v-btn
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
            </v-card-subtitle>
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
    return {
      languages: await fetchCategories()
    }
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
      if (!this.newLanguage) {
        return
      }
      this.$set(this.languages, this.newLanguage, {
        name: this.newLanguage,
        technologies: []
      })
      this.newLanguage = ''
    },
    deleteLanguage(language) {
      this.languageSelected = language.name
      if (this.languageSelected === language.name) {
        this.languageSelected = ''
      }
      this.$delete(this.languages, language.name)
    },
    addTechnology() {
      if (!this.languageSelected) {
        return
      }
      this.languageSelected.technologies.push(this.newTechnology)
      this.newTechnology = ''
    },
    deleteTechnology(technology) {
      const id = this.languageSelected.technologies.findIndex((index) => {
        return index === technology
      })
      this.languageSelected.technologies.splice(id, 1)
    }
  }
}
</script>

<style scoped lang="sass">
.my_active
  background-color: #7F828B !important
button.v-btn.v-btn--block
  margin-bottom: 15px
</style>
