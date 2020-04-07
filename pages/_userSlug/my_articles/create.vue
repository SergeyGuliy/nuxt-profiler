<template>
  <Page id="createArticle">
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
            @click="save"
            :disabled="!formIsValid"
            v-tooltip.bottom-start="'Create article.'"
            class="mx-1"
            color="green"
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
export default {
  name: 'Create',
  data() {
    return {
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
  async asyncData({ error }) {
    try {
      return {
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch your data." })
    }
  },
  head: {
    title: `Profiler - Create Article`
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
          creatorName: this.$store.getters.user.profile,
          creatorId: this.$store.getters.user.id
        }
        const id = await createArticle(data)
        await this.$store.dispatch('updateArticlesList', { type: 'add', id })
        this.$dialog.message.success(`Created Article: ${this.name}`, {
          position: 'top-right',
          timeout: 3000
        })
        this.$router.push(`/${this.$store.getters.user.profile}/my_articles`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="sass">
#createArticle
  .v-input.switch
    margin: 3px
    height: 36px
</style>
