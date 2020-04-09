<template>
  <Page id="userHomePage">
    <template #head>
      <PageHeader v-if="loggedIn">
        <template #title>
          {{ headerText }}
          <v-chip v-if="data.isAdmin" small>Admin</v-chip>
        </template>

        <template #actions>
          <BtnPrint />
          <BtnShare :link="`users/${id}`" />
        </template>
      </PageHeader>
      <PageHeader v-else>
        <template #title>
          Profiler is service for making bookmarks for articles and
          repositories.
        </template>
      </PageHeader>
    </template>
    <template #body>
      <UserShowingData
        v-if="loggedIn"
        :data="data"
        :all-users="allUsers"
        :all-repositories="allRepositories"
        :all-articles="allArticles"
        :git-api-info="gitApiInfo"
      />
      <UserEmptyData v-else />
    </template>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import UserEmptyData from '../components/layout_components/pages_wrappers/pages_components/UserEmptyData'
import { fetchAllArticles } from '~/functions/articles'
import { fetchAllRepositories } from '~/functions/repositories'
import { fetchUserByID, fetchAllUsers } from '~/functions/users'
export default {
  transition: 'bounce',
  components: { UserEmptyData },
  async asyncData({ app, store, error }) {
    if (store.getters.loggedIn) {
      try {
        const data = await fetchUserByID(store.getters.id)
        const allUsers = await fetchAllUsers()
        const allRepositories = await fetchAllRepositories()
        const allArticles = await fetchAllArticles()
        if (data.userInfo.contacts.gitApi) {
          return {
            data,
            allUsers,
            allRepositories,
            allArticles,
            gitApiInfo: (await app.$axios.get(data.userInfo.contacts.gitApi))
              .data
          }
        } else {
          return {
            data,
            allUsers,
            allRepositories,
            allArticles,
            gitApiInfo: false
          }
        }
      } catch (e) {
        error({ message: "Can't fetch your data." })
      }
    }
  },
  computed: {
    ...mapGetters(['id', 'loggedIn']),
    headerText() {
      return this.data.userInfo.info.first_name &&
        this.data.userInfo.info.last_name
        ? `${this.data.userInfo.info.first_name} ${this.data.userInfo.info.last_name}`
        : `${this.data.profile}`
    }
  }
}
</script>
