<template>
  <Page id="Edit">
    <template #head>
      <PageHeader>
        <template #title>Create Article</template>
        <template #actions>
          <v-switch
            v-model="isPublic"
            :label="isPublic ? 'Public article' : 'Private article'"
            class="switch"
            inset
          />
          <v-btn
            v-tooltip.bottom-start="'Create article.'"
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
              label="Article name"
              outlined
            />
            <v-text-field
              v-model="cite"
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
import { createArticle } from '~/functions/articles'
import { fetchCategories } from '~/functions/language-technologies'

/**
 * ---(_userSlug/my_articles/create.vue)--- Page witch can create new article.
 * @module pages/_userSlug/my_articles/create
 *
 * @vue-event {context(error)} asyncData    - return ['fetchCategories']{@link external:functions_language_technologies}
 * @vue-data {string} name                  - Name of new article
 * @vue-data {string} about                 - About of new article
 * @vue-data {string} cite                  - Cite link of new article
 * @vue-data {string} language              - Language of new article
 * @vue-data {string} technology            - Technology of new article
 * @vue-data {Boolean} isPublic             - Flag with will controls logic of is public will be article
 * @vue-data {Object} rules                 - rules for inputs
 * @vue-computed {Boolean} formIsValid      - Controls ability to create new article
 * @vue-event {data} save                   - Create new article, by ['createArticle']{@link external:functions_articles}. And adds article id to my list by action ['updateArticlesList']{@link external:store_articles}
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
        /http.+/.test(this.cite) &&
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
        const data = {
          name: this.name,
          about: this.about,
          cite: this.cite,
          language: this.language,
          technology: this.technology,
          isPublic: this.isPublic,
          creatorName: this.$store.getters.profile,
          creatorId: this.$store.getters.id
        }
        const id = await createArticle(data)
        await this.$store.dispatch('articles/updateArticlesList', {
          type: 'add',
          id
        })
        this.$dialog.message.success(`Created Article: ${this.name}`, {
          position: 'top-right',
          timeout: 5000
        })
        this.$router.push(`/${this.$store.getters.profile}/my_articles`)
      } catch (e) {
        console.log(`Error in creation new article: ${e}`)
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
