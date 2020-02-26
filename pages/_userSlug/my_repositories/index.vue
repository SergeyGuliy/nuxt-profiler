<template>
  <Page id="myRepositories">
    <template #head>
      <PageHeader>
        <template #title>List of my Repositories</template>
        <template #actions>
          <v-btn
            @click="
              $router.push(
                `/${$store.getters.user.profile}/my_repositories/create`
              )
            "
            class="mx-1"
            >Create</v-btn
          >
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="1">
        <template #c-1>
          <Table>
            <template #table-head>
              <tr>
                <th>Name</th>
                <th>Creator</th>
                <th>Language</th>
                <th>Technology</th>
                <th>Actions</th>
              </tr>
            </template>
            <template #table-body>
              <tr v-for="item in myList" :key="item.id">
                <td>{{ item.name }}</td>
                <td>
                  <v-btn @click="$router.push(`/users/${item.id}`)"
                    >{{ item.creatorName }}
                    <v-icon color="green">mdi-face-profile</v-icon></v-btn
                  >
                </td>
                <td>{{ item.language }}</td>
                <td>{{ item.technology }}</td>
                <td>
                  <v-btn
                    @click="$router.push(`/repositories/${item.id}`)"
                    icon
                    color="green"
                    ><v-icon>mdi-source-repository</v-icon></v-btn
                  >
                  <v-btn @click="deleteFromMyList(item.id)" icon color="warning"
                    ><v-icon>mdi-minus-circle</v-icon></v-btn
                  >
                </td>
              </tr>
            </template>
          </Table>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  computed: {
    myList() {
      const myListIDS = this.$store.getters.user.lists.repositories
      const myList = []
      for (const i of myListIDS) {
        try {
          const rep = this.allRepositories[i]
          rep.id = i
          myList.push(rep)
        } catch (e) {
          continue
        }
      }
      return myList
    }
  },
  head: {
    title: `Profiler - User Repositories`
  },
  async asyncData() {
    try {
      return {
        allRepositories: await fetchAllRepositories()
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteRepository', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
