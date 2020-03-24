<template>
  <Page id="userHomePage">
    <template #head>
      <PageHeader>
        <template
          #title
          v-if="data.userInfo.info.first_name && data.userInfo.info.last_name"
        >
          {{ data.userInfo.info.first_name }} {{ data.userInfo.info.last_name }}
          <v-chip v-if="data.isAdmin" small>Admin</v-chip>
        </template>
        <template #title v-else>
          {{ data.profile }}
          <v-chip v-if="data.isAdmin" small>Admin</v-chip>
        </template>
        <template #actions>
          <BtnPrint />
          <BtnShare :link="`users/${$store.getters.user.id}`" />
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
import { fetchAllArticles } from '~/functions/articles'
import { fetchAllRepositories } from '~/functions/repositories'
import { fetchAllUsers } from '~/functions/users'
export default {
  transition: 'bounce',
  async asyncData({ app, store, error }) {
    try {
      const data = store.getters.user
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
      error({ message: "Can't fetch your data (" })
    }
  }
}
</script>
