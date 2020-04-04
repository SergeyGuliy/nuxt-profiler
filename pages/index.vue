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
          Profiler is service for making bookmarks for articles and
          repositories.
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
          <Card>
            <br />
            <CardTitle>You have ability to manage your profile.</CardTitle>
            <br />
            <img src="~/static/user.png" alt="user" class="info_img" />
            <br />
            <CardTitle>And print your profile as CV.</CardTitle>
            <br />
            <img src="~/static/user_print.png" alt="print" class="info_img" />
          </Card>
        </template>
        <template #c-2>
          <Card>
            <br />
            <CardTitle>
              Also you can fill your portfolio with preview.
            </CardTitle>
            <br />
            <img src="~/static/portfolio.png" alt="portf" class="info_img" />
            <br />
            <CardTitle>
              And become admin to manage languages items.
            </CardTitle>
            <br />
            <img src="~/static/admin.png" alt="admin" class="info_img" />
          </Card>
        </template>
        <template #c-3>
          <Card>
            <br />
            <CardTitle>You can create new articles or repositories.</CardTitle>
            <br />
            <img src="~/static/save.png" alt="save" class="info_img" />
            <br />
            <CardTitle>Or add from public lists.</CardTitle>
            <br />
            <img src="~/static/rep_list.png" alt="lists" class="info_img" />
          </Card>
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
            gitApiInfo:
              (await app.$axios.get(data.userInfo.contacts.gitApi)).data ||
              false
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
  }
}
</script>
