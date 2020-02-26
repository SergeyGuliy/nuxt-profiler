<template>
  <Page id="allUsers">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            list.length > 0 ? 'List of all Users' : 'There is no users in base'
          }}
        </template>
        <template #actions v-if="list.length > 0">
          <v-text-field
            v-model="searchKey"
            label="Search"
            outlined
            clearable
            dense
          />
        </template>
      </PageHeader>
    </template>
    <template #body v-if="list.length > 0">
      <PageBody col="1">
        <template #c-1>
          <Table v-if="listFiltered.length > 0">
            <template #table-head>
              <tr>
                <th>Name</th>
                <th>Repositories</th>
                <th>Articles</th>
                <th>Friends</th>
                <th>Actions</th>
              </tr>
            </template>
            <template #table-body>
              <tr v-for="item in listFiltered" :key="item.id">
                <td>
                  <TableLink :link="`/users/${item.id}`" :text="item.profile" />
                </td>
                <td>
                  <TableText :text="item.lists.repositories.length - 1" />
                </td>
                <td>
                  <TableText :text="item.lists.articles.length - 1" />
                </td>
                <td>
                  <TableText :text="item.lists.friends.length - 1" />
                </td>
                <td>
                  <TableIcon
                    v-if="!$store.getters.user.lists.friends.includes(item.id)"
                    :item="item.id"
                    :action="addTomMyList"
                    color="info"
                    icon="mdi-plus-circle"
                  />
                  <TableIcon
                    v-else
                    :item="item.id"
                    :action="deleteFromMyList"
                    color="warning"
                    icon="mdi-minus-circle"
                  />
                </td>
              </tr>
            </template>
          </Table>
          <Card v-else>Поиск не дал результата</Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchAllUsers } from '~/functions/users'
export default {
  name: 'Index',
  transition: 'bounce',
  data() {
    return {
      searchKey: null
    }
  },
  computed: {
    list() {
      const list = []
      for (const i in this.allUsers) {
        try {
          const usr = this.allUsers[i]
          if (usr.id === this.$store.getters.user.id) {
            continue
          }
          usr.id = i
          list.push(usr)
        } catch (e) {
          continue
        }
      }
      return list
    },
    listFiltered() {
      if (this.searchKey) {
        return this.list.filter((value) => {
          return value.profile
            .toLowerCase()
            .includes(this.searchKey.toLowerCase())
        })
      } else {
        return this.list
      }
    }
  },
  async asyncData() {
    try {
      return {
        allUsers: await fetchAllUsers()
      }
    } catch (e) {}
  },
  head: {
    title: `Profiler - All Users`
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
<style lang="sass">
#allUsers
  .v-input
    margin: 2px
    width: 32%
    max-width: 200px
  .v-input__slot
    margin: 0
    padding: 0 7px
  .v-text-field__details
    display: none
  .v-select__selection.v-select__selection--comma, .v-label, .v-text-field__slot
    font-size: 13px
  .v-input__append-inner
    padding: 0
    height: 20px
    width: 20px
    .v-icon
      height: 20px
      width: 20px
</style>
