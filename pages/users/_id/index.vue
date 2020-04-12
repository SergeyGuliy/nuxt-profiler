<template>
  <Page id="userHomePage">
    <template #head>
      <PageHeader>
        <template
          v-if="data.userInfo.info.first_name && data.userInfo.info.last_name"
          #title
          >{{ data.userInfo.info.first_name }}
          {{ data.userInfo.info.last_name }}
          <v-chip v-if="data.isAdmin" small class="title-chip">Admin</v-chip>
        </template>
        <template v-else #title>
          {{ data.profile }}
          <v-chip v-if="data.isAdmin" small>Admin</v-chip>
        </template>
        <template #actions>
          <BtnPrint />
          <BtnShare :link="`users/${$route.params.id}`" />
          <div
            v-if="
              $store.getters.loggedIn && $store.getters.id !== $route.params.id
            "
          >
            <v-btn
              v-if="!$store.getters['friends/friends'].includes(data.id)"
              v-tooltip.bottom-start="'Add to my friends.'"
              color="green"
              outlined
              class="headerButton"
              @click="addTomMyList(data.id)"
            >
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-tooltip.bottom-start="'Remove from my friends.'"
              color="red"
              outlined
              class="headerButton"
              @click="deleteFromMyList(data.id)"
            >
              <v-icon>mdi-account-minus</v-icon>
            </v-btn>
          </div>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <UserShowingData
        :data="data"
        :all-users="allUsers"
        :all-repositories="allRepositories"
        :all-articles="allArticles"
        :git-api-info="gitApiInfo"
      />
    </template>
  </Page>
</template>

<script>
import BtnShare from '../../../components/buttons_components/BtnShare'
import BtnPrint from '../../../components/buttons_components/BtnPrint'
import UserShowingData from '../../../components/pages_components/UserShowingData'

import { controlFriends } from '../../../mixins/controlFriends'

import { fetchUserByID, fetchAllUsers } from '~/functions/users'
import { fetchAllArticles } from '~/functions/articles'
import { fetchAllRepositories } from '~/functions/repositories'

/**
 * ---(users/_id/index.vue)--- Basic view of user. If user logged in, he can add or remove friend to his list
 * @module pages/users/_id/index
 *
 * @vue-event {Object(app, store, error)} asyncData - Return ['fetchUserByID']{@link external:functions_users}, ['fetchAllUsers']{@link external:functions_users}, ['fetchAllRepositories']{@link external:functions_repositories}, ['fetchAllArticles']{@link external:functions_articles}, else if user have gitApi will be fetch GitHub info of user.
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 */
export default {
  name: 'Id',
  transition: 'bounce',
  components: { UserShowingData, BtnPrint, BtnShare },

  mixins: [controlFriends],
  async asyncData({ route, app, error }) {
    try {
      const data = await fetchUserByID(route.params.id)
      const allUsers = await fetchAllUsers()
      const allRepositories = await fetchAllRepositories()
      const allArticles = await fetchAllArticles()
      if (data.userInfo.contacts.gitApi) {
        return {
          data,
          allUsers,
          allRepositories,
          allArticles,
          gitApiInfo: (await app.$axios.get(data.userInfo.contacts.gitApi)).data
        }
      }
      return {
        data,
        allUsers,
        allRepositories,
        allArticles,
        gitApiInfo: false
      }
    } catch (e) {
      error({ message: 'User not found.' })
    }
  },
  head: {
    title: `Profiler - User Information`
  }
}
</script>

<style lang="sass">
@import '~/assets/pages_styles/userHomePage.sass'
</style>
