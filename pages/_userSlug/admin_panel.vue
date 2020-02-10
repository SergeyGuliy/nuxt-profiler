<template>
  <BodyCard>
    <template #head>
      <BodyCardHeader>
        <template #title>List of my Articles</template>
      </BodyCardHeader>
    </template>
    <template #body>
      <BodyCardMain2>
        <template #c-1>
          <v-card color="#385F73" dark>
            <v-card-subtitle>
              <v-text-field
                v-model="newLanguage"
                label="Language"
                outlined
                @keypress.enter="addLanguage"
              ></v-text-field>
              <v-btn @click="addLanguage" block>ADD</v-btn>
              <v-list v-if="languages.length !== 0">
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
            </v-card-subtitle>
          </v-card>
        </template>
        <template #c-2>
          <v-card color="#385F73" dark>
            <v-card-subtitle>
              <v-text-field
                v-model="newTechnology"
                label="Technologie"
                outlined
                @keypress.enter="addTechnology"
              ></v-text-field>
              <v-btn v-if="newTechnology" @click="addTechnology" block
                >ADD</v-btn
              >
              <v-list v-if="languageSelected">
                <v-list-item
                  v-for="item in languageSelected.technologies"
                  :key="item"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn @click="deleteTechnology(item)" icon>
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-subtitle>
          </v-card>
        </template>
      </BodyCardMain2>
    </template>
  </BodyCard>
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
        // await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        //
      }
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

<style scoped></style>
