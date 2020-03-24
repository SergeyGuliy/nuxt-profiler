<template>
  <Page id="userHomePage">
    <template #head>
      <PageHeader>
        <template
          #title
          v-if="data.userInfo.info.first_name && data.userInfo.info.last_name"
          >{{ data.userInfo.info.first_name }}
          {{ data.userInfo.info.last_name }}
          <v-chip v-if="data.isAdmin" small class="title-chip">Admin</v-chip>
        </template>
        <template #title v-else>
          {{ data.profile }}
          <v-chip v-if="data.isAdmin" small>Admin</v-chip>
        </template>
        <template #actions v-if="data.id !== $store.getters.user.id">
          <BtnPrint />
          <BtnShare :link="`users/${$route.params.id}`" />
          <v-btn
            @click="addTomMyList(data.id)"
            v-if="!$store.getters.user.lists.friends.includes(data.id)"
            color="green"
            class="mx-1"
          >
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
          <v-btn @click="deleteFromMyList()" v-else color="red" class="mx-1">
            <v-icon>mdi-account-minus</v-icon>
          </v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <UserShowingData
        :data="data"
        :allUsers="allUsers"
        :allRepositories="allRepositories"
        :allArticles="allArticles"
        :gitApiInfo="gitApiInfo"
      />
    </template>
  </Page>
</template>

<script>
import { fetchUserByID, fetchAllUsers } from '~/functions/users'
import { fetchAllArticles } from '~/functions/articles'
import { fetchAllRepositories } from '~/functions/repositories'

export default {
  name: 'Id',
  transition: 'bounce',
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
      error({ message: 'User not found' })
    }
  },
  head: {
    title: `Profiler - User Information`
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteFriend', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.error(`You delete friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushFriend', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.success(`You add friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    }
  }
}
</script>
