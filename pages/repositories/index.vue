<template>
  <Page>
    <template #head>
      <PageHeader>
        <template #title>Edit Profile</template>
        <template #actions>
          <v-btn class="mx-1">Save</v-btn>
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
                <th>Actions</th>
              </tr>
            </template>
            <template #table-body>
              <tr v-for="item in publicList" :key="item.id">
                <td>{{ item.name }}</td>
                <td>
                  <v-btn @click="$router.push(`/users/${item.id}`)"
                    >{{ item.creatorName }}
                    <v-icon>mdi-face-profile</v-icon></v-btn
                  >
                </td>
                <td>
                  <v-btn
                    @click="$router.push(`/repositories/${item.id}`)"
                    icon
                    color="secondary"
                    ><v-icon>mdi-source-repository</v-icon></v-btn
                  >
                  <v-btn
                    v-if="
                      !$store.getters.user.lists.repositories.includes(item.id)
                    "
                    @click="addTomMyList(item.id)"
                    icon
                    color="info"
                    ><v-icon>mdi-plus-circle</v-icon></v-btn
                  >
                  <v-btn
                    v-else-if="
                      $store.getters.user.lists.repositories.includes(item.id)
                    "
                    @click="deleteFromMyList(item.id)"
                    icon
                    color="warning"
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
import {
  fetchAllRepositories,
  fetchPublicRepositoriesIDS
} from '~/functions/repositories'
export default {
  name: 'Index',
  computed: {
    publicList() {
      const publicListList = []
      for (const i of this.publicRepositoriesIDS) {
        try {
          const rep = this.allRepositories[i]
          rep.id = i
          publicListList.push(rep)
        } catch (e) {
          continue
        }
      }
      console.log(publicListList)
      return publicListList
    }
  },
  head: {
    title: `Profiler - Public Repositories`
  },
  async asyncData() {
    return {
      allRepositories: await fetchAllRepositories(),
      publicRepositoriesIDS: await fetchPublicRepositoriesIDS()
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
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushRepository', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="sass">
td, th
  text-align: center !important
</style>
