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
              color="green"
              @click="addTomMyList(data.id)"
            >
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
            <v-btn v-else color="red" @click="deleteFromMyList(data.id)">
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
import { controlFriends } from '../../../mixins/controlFriends'
import { fetchUserByID, fetchAllUsers } from '~/functions/users'
import { fetchAllArticles } from '~/functions/articles'
import { fetchAllRepositories } from '~/functions/repositories'

export default {
  name: 'Id',
  transition: 'bounce',
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
