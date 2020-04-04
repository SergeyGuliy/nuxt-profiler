<template>
  <Page id="createRepository">
    <template #head>
      <PageHeader>
        <template #title>Create Portfolio work</template>
        <template #actions>
          <v-btn
            @click="save"
            :disabled="!formIsValid"
            v-tooltip.bottom-start="'Create portfolio work.'"
            class="mx-1"
            color="green"
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
  head: {
    title: `Profiler - Create work`
  },
  computed: {
    formIsValid() {
      return !!this.name && this.name.length <= 25
    }
  },
  methods: {
    async save() {
      try {
        const data = {
          name: this.name,
          cite: this.cite,
          gitHub: this.gitHub,
          creatorName: this.$store.getters.user.profile,
          creatorId: this.$store.getters.user.id,
          key: new Date().getTime()
        }
        this.$store.commit('pushPortfolioWork', data)
        console.log(this.$store.getters.user.lists.portfolio)
        await this.$store.dispatch('updateUserInfo')
        this.$dialog.message.success(`Created portfolio work: ${this.name}`, {
          position: 'top-right',
          timeout: 3000
        })
        this.$router.push(`/${this.$store.getters.user.profile}/my_portfolio`)
      } catch (e) {
        console.log(e)
        this.$dialog.message.error(
          `Error while trying to connect to repository. Check link to repository.`,
          {
            position: 'top-right',
            timeout: 3000
          }
        )
      }
    }
  }
}
</script>
