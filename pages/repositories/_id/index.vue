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
          <v-btn
            v-if="$router"
            v-tooltip.bottom-start="'Edit repository.'"
            color="orange"
            class="headerButton"
            outlined
            :disabled="!$store.getters.id === data.creatorId"
            @click="$router.push(`/repositories/${$route.params.id}/edit`)"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <BtnPrint />
          <BtnShare :link="`repositories/${$route.params.id}`" />
          <div v-if="data.isPublic && $store.getters.loggedIn">
            <v-btn
              v-if="
                !$store.getters['repositories/repositories'].includes(
                  $route.params.id
                )
              "
              v-tooltip.bottom-start="'Add to my repositories.'"
              class="headerButton btn_add"
              outlined
              color="green"
              @click="addTomMyList($route.params.id)"
            >
              <v-icon>mdi-vector-polyline-plus</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-tooltip.bottom-start="'Remove from my repositories.'"
              color="red"
              class="headerButton btn_rm"
              outlined
              @click="deleteFromMyList($route.params.id)"
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
                <v-chip color="indigo" text-color="white" large pill label>
                  <v-chip left color="red" small pill label class="icon">
                    {{ gitApiInfo.watchers_count }}
                  </v-chip>
                  Stars
                </v-chip>
                <v-chip color="indigo" text-color="white" large pill label>
                  <v-chip left color="red" small pill label class="icon">
                    {{ gitApiInfo.subscribers_count }}
                  </v-chip>
                  Watchers
                </v-chip>
                <v-chip color="indigo" text-color="white" large pill label>
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
                <BtnCopy :copy-value="gitApiInfo.owner.html_url" />
              </div>
            </CardRow>
            <CardRow v-if="data.cite || gitApiInfo.html_url">
              <CardRowTitle>Link to official site:</CardRowTitle>
              <div>
                <BtnOpenBlank
                  :link="data.cite ? data.cite : gitApiInfo.html_url"
                />
                <BtnCopy
                  :copy-value="data.cite ? data.cite : gitApiInfo.html_url"
                />
              </div>
            </CardRow>
            <CardRow>
              <CardRowTitle>Link to github repository:</CardRowTitle>
              <div>
                <BtnOpenBlank :link="data.gitHub" icon="mdi-git" />
                <BtnCopy :copy-value="data.gitHub" />
              </div>
            </CardRow>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import BtnOpenBlank from '../../../components/buttons_components/BtnOpenBlank'
import BtnShare from '../../../components/buttons_components/BtnShare'
import BtnPrint from '../../../components/buttons_components/BtnPrint'
import BtnRouter from '../../../components/buttons_components/BtnRouter'
import BtnCopy from '../../../components/buttons_components/BtnCopy'

import { controlRepositories } from '../../../mixins/controlRepositories'
import { fetchRepositoryByID } from '~/functions/repositories'

/**
 * ---(repositories/_id/index.vue)--- Basic view of repository. If user logged in, he can add or remove repository to his list
 * @module pages/repositories/_id/index
 *
 * @vue-event {Object(app, store, error)} asyncData - Return ['fetchRepositoryByID']{@link external:functions_repositories}, else fetch GitHub info.
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlRepositories.js]{@link external:mixins_controlRepositories}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlRepositories.js]{@link external:mixins_controlRepositories}
 */
export default {
  name: 'Id',
  transition: 'bounce',
  components: { BtnCopy, BtnRouter, BtnOpenBlank, BtnPrint, BtnShare },
  mixins: [controlRepositories],
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
  data() {
    return {
      // ---------------------------Created for testing--------------------------------------------
      data: {
        name: '',
        creatorId: '',
        creatorName: '',
        language: '',
        technology: '',
        isPublic: true,
        cite: '',
        gitHub: '',
        about: ''
      },
      gitApiInfo: {
        watchers_count: 0,
        subscribers_count: 0,
        forks: 0,
        language: '',
        description: '',
        owner: {
          html_url: '',
          login: ''
        },
        html_url: ''
      }
      // ---------------------------Created for testing--------------------------------------------
    }
  },
  head: {
    title: `Profiler - Repository Information`
  }
}
</script>

<style lang="sass">
#ShowRepository
  .v-slide-group__content
    padding: 0
    .v-chip--pill
      height: 25px
      padding: 0 2px
      margin: 0 2px !important
      .v-chip--pill
        height: 18px
        padding: 0 2px
  .icon
    height: 15px
</style>
