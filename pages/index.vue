<template>
  <Page id="userHomePage">
    <template #head>
      <PageHeader v-if="$store.getters.user">
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
      <PageHeader v-else>
        <template #title>
          You are not logged in.
        </template>
      </PageHeader>
    </template>
    <template #body>
      <UserShowingData
        v-if="$store.getters.user"
        :data="data"
        :allUsers="allUsers"
        :allRepositories="allRepositories"
        :allArticles="allArticles"
        :gitApiInfo="gitApiInfo"
      />
      <PageBody v-else col="3">
        <template #c-1>
          <Card> </Card>
        </template>
        <template #c-2>
          <Card> </Card>
        </template>
        <template #c-3>
          <Card> </Card>
        </template>
      </PageBody>
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
    if (store.getters.user) {
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
            gitApiInfo: (await app.$axios.get(data.userInfo.contacts.gitApi))
              .data
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
        error({ message: "Can't fetch your data." })
      }
    }
  }
}
</script>
