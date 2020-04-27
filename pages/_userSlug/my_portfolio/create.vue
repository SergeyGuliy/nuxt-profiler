<template>
  <Page id="createRepository">
    <template #head>
      <PageHeader>
        <template #title>Create Portfolio work</template>
        <template #actions>
          <v-btn
            v-tooltip.bottom-start="'Create portfolio work.'"
            :disabled="!formIsValid"
            class="mx-1 headerButton"
            color="green"
            outlined
            @click="save"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="1">
        <template #c-1>
          <Card>
            <v-text-field
              v-model="name"
              :rules="rules.name"
              :counter="25"
              label="Work name"
              outlined
            />
            <v-text-field
              v-model="cite"
              :rules="rules.cite"
              :counter="100"
              placeholder="https://....."
              label="Link to site"
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
      </PageBody>
    </template>
  </Page>
</template>

<script>
/**
 * ---(_userSlug/my_portfolio/create.vue)--- Page witch can create new portfolio work.
 * @module pages/_userSlug/my_portfolio/create
 *
 * @vue-data {string} name                  - Name of new article
 * @vue-data {string} cite                  - Cite link of new portfolio work
 * @vue-data {string} gitHub                - GitHub link of new portfolio work
 * @vue-data {Object} rules                 - rules for inputs
 * @vue-computed {Boolean} formIsValid      - Controls ability to create new portfolio work
 * @vue-event {data} save                   - Create new portfolio work, by ['updatePortfolio']{@link external:store_portfolio}
 */
export default {
  name: 'Create',
  data() {
    return {
      name: '',
      cite: '',
      gitHub: '',
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
    }
  },
  methods: {
    async save() {
      try {
        const data = {
          name: this.name,
          cite: this.cite,
          gitHub: this.gitHub,
          creatorName: this.$store.getters.profile,
          creatorId: this.$store.getters.id,
          key: new Date().getTime()
        }
        await this.$store.dispatch('portfolio/updatePortfolio', {
          type: 'add',
          work: data
        })
        this.$dialog.message.success(`Created portfolio work: ${this.name}`, {
          position: 'top-right',
          timeout: 5000
        })
        this.$router.push(`/${this.$store.getters.profile}/my_portfolio`)
      } catch (e) {
        console.log(`Error in trying to create portfolio work: ${e}`)
        this.$dialog.message.error(
          `Error while trying to connect to repository. Check link to repository.`,
          {
            position: 'top-right',
            timeout: 5000
          }
        )
      }
    }
  },
  head: {
    title: `Profiler - Create work`
  }
}
</script>
