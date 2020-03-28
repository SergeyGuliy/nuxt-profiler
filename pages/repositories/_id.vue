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
          <div v-if="data.isPublic && $store.getters.user">
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
            <CardRow>
              <CardRowTitle>GitHub Info:</CardRowTitle>
              <v-chip-group column>
                <v-chip
                  class="mx-1"
                  color="indigo"
                  text-color="white"
                  large
                  pill
                  label
                >
                  <v-chip left color="red" small pill label class="icon">
                    {{ gitApiInfo.watchers_count }}
                  </v-chip>
                  Stars
                </v-chip>
                <v-chip
                  class="mx-1"
                  color="indigo"
                  text-color="white"
                  large
                  pill
                  label
                >
                  <v-chip left color="red" small pill label class="icon">
                    {{ gitApiInfo.subscribers_count }}
                  </v-chip>
                  Watchers
                </v-chip>
                <v-chip
                  class="mx-1"
                  color="indigo"
                  text-color="white"
                  large
                  pill
                  label
                >
                  <v-chip left color="red" small pill label class="icon">
                    {{ gitApiInfo.forks }}
                  </v-chip>
                  Forks
                </v-chip>
              </v-chip-group>
            </CardRow>
            <CardRow v-if="data.language || gitApiInfo.language">
              <CardRowTitle>Language:</CardRowTitle>
              <span>
                {{ data.language ? data.language : gitApiInfo.language }}
              </span>
            </CardRow>

            <CardRow v-if="data.technology">
              <CardRowTitle>Technology:</CardRowTitle>
              <span>{{ data.technology }}</span>
            </CardRow>

            <CardRow>
              <CardRowTitle>Description:</CardRowTitle>
            </CardRow>
            <CardRow>
              <p v-if="data.about || gitApiInfo.description">
                {{ data.about ? data.about : gitApiInfo.description }}
              </p>
              <p v-else>Description is empty.</p>
            </CardRow>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <CardRow>
              <CardRowTitle>Creator in Profiler:</CardRowTitle>
              <BtnRouter
                :link="`/users/${data.creatorId}`"
                :text="data.creatorName"
                icon="mdi-face-profile"
              />
            </CardRow>
            <CardRow>
              <CardRowTitle>Creator in GitHub:</CardRowTitle>
              <div>
                <BtnOpenBlank
                  :link="gitApiInfo.owner.html_url"
                  :text="gitApiInfo.owner.login"
                  icon="mdi-github"
                />
                <BtnCopy :copyValue="gitApiInfo.owner.html_url" />
              </div>
            </CardRow>
            <CardRow v-if="data.cite || gitApiInfo.html_url">
              <CardRowTitle>Link to official site:</CardRowTitle>
              <div>
                <BtnOpenBlank
                  :link="data.cite ? data.cite : gitApiInfo.html_url"
                />
                <BtnCopy
                  :copyValue="data.cite ? data.cite : gitApiInfo.html_url"
                />
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
  mounted() {
    console.log(this.data.gitApiKey)
    console.log(this.gitApiInfo)
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

<style lang="sass">
#ShowRepository
  .v-chip--pill
    height: 25px
    padding: 0 5px
  .icon
    height: 15px
</style>
