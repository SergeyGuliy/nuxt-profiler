<template>
  <Page id="ShowRepository">
    <template #head>
      <PageHeader>
        <template #title>
          {{ data.name }}
          <v-chip small class="title-chip">
            {{ data.isPublic ? 'Public' : 'Private' }}
          </v-chip>
        </template>
        <template #actions>
          <BtnPrint />
          <BtnShare :link="`repositories/${$route.params.id}`" />
          <div v-if="data.isPublic">
            <v-btn
              @click="addTomMyList($route.params.id)"
              v-if="
                !$store.getters.user.lists.repositories.includes(
                  $route.params.id
                )
              "
              class="mx-1"
              color="green"
            >
              <v-icon>mdi-vector-polyline-plus</v-icon>
            </v-btn>
            <v-btn
              @click="deleteFromMyList($route.params.id)"
              v-else
              class="mx-1"
              color="red"
            >
              <v-icon>mdi-vector-polyline-minus</v-icon>
            </v-btn>
          </div>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <CardRow v-if="data.language">
              <CardRowTitle>Language:</CardRowTitle>
              <span>{{ data.language }}</span>
            </CardRow>

            <CardRow v-if="data.technology">
              <CardRowTitle>Technology:</CardRowTitle>
              <span>{{ data.technology }}</span>
            </CardRow>

            <CardRow>
              <CardRowTitle>Description:</CardRowTitle>
            </CardRow>
            <CardRow>
              <p v-if="data.about">{{ data.about }}</p>
              <p v-else>Description is empty.</p>
            </CardRow>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <CardRow>
              <CardRowTitle>Creator:</CardRowTitle>
              <BtnRouter
                :link="`/users/${data.creatorId}`"
                :text="data.creatorName"
                icon="mdi-face-profile"
              />
            </CardRow>
            <CardRow v-if="data.cite">
              <CardRowTitle>Link to official site:</CardRowTitle>
              <div>
                <BtnOpenBlank :link="data.cite" />
                <BtnCopy :copyValue="data.cite" />
              </div>
            </CardRow>
            <CardRow>
              <CardRowTitle>Link to github repository:</CardRowTitle>
              <div>
                <BtnOpenBlank :link="data.gitHub" icon="mdi-git" />
                <BtnCopy :copyValue="data.gitHub" />
              </div>
            </CardRow>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchRepositoryByID } from '~/functions/repositories'
export default {
  name: 'Id',
  transition: 'bounce',
  async asyncData({ route, $axios, error }) {
    try {
      const data = await fetchRepositoryByID(route.params.id)
      const gitApiInfo = (await $axios.get(data.gitApiKey)).data
      return {
        data,
        gitApiInfo
      }
    } catch (e) {
      error({ message: 'Repository not found' })
    }
  },
  head: {
    title: `Profiler - Repository Information`
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteRepository', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.error(`You delete repository`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushRepository', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.success(`You add repository`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    }
  }
}
</script>
