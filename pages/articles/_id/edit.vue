<template>
  <Page id="Edit">
    <template #head>
      <PageHeader>
        <template #title>Create Article</template>
        <template #actions>
          <v-switch
            v-model="data.isPublic"
            :label="data.isPublic ? 'Public article' : 'Private article'"
            class="switch"
            inset
          />
          <v-btn
            v-tooltip.bottom-start="'Update article.'"
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
              label="Article name"
              outlined
            />
            <v-text-field
              v-model="data.cite"
              :rules="rules.cite"
              :counter="100"
              placeholder="https://....."
              label="Link to article"
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
import { fetchArticleByID, updateArticle } from '~/functions/articles'
import { fetchCategories } from '~/functions/language-technologies'

/**
 * ---(articles/_id/edit.vue)--- Page for editing article
 * @module pages/articles/_id/edit
 *
 * @vue-event {Object(route, error)} asyncData   - Return ['fetchArticleByID']{@link external:functions_articles}, and ['fetchCategories']{@link external:functions_language_technologies}
 * @vue-data {Object} rules                      - rules for inputs
 * @vue-computed {Boolean} formIsValid           - Controls ability to update article
 * @vue-event {data} save                        - Update article, by ['updateArticle']{@link external:functions_articles}.
 */
export default {
  name: 'Edit',
  async asyncData({ error, route }) {
    const data = await fetchArticleByID(route.params.id)
    try {
      return {
        data,
        oldData: Object.assign({}, data),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch article." })
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
        /http.+/.test(this.data.cite) &&
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
        const updatedData = {
          name: this.data.name,
          about: this.data.about,
          cite: this.data.cite,
          language: this.data.language,
          technology: this.data.technology,
          isPublic: this.data.isPublic,
          creatorName: this.data.creatorName,
          creatorId: this.data.creatorId
        }
        await updateArticle(updatedData, this.$route.params.id)
        this.$dialog.message.success(`Created Article: ${this.name}`, {
          position: 'top-right',
          timeout: 5000
        })
        this.$router.push(`/articles/${this.$route.params.id}`)
      } catch (e) {
        console.log(`Error in trying to update article: ${e}`)
      }
    }
  },
  head: {
    title: `Profiler - Create Article`
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
