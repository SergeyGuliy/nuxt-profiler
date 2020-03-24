<template>
  <Page id="myRepositories">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            checkedList.length > 0
              ? 'List of my repositories'
              : "You don't have repositories"
          }}
          <BtnCreate
            :link="`/${$store.getters.user.profile}/my_repositories/create`"
          />
        </template>
        <template #actions v-if="checkedList.length > 0">
          <v-select
            :items="[5, 10, 15]"
            v-model="pageSize"
            label="Page size"
            outlined
            dense
            style="max-width: 56px;"
          />
          <v-select
            v-model="language"
            :items="Object.keys(languages)"
            label="Language"
            outlined
            clearable
            dense
          >
          </v-select>
          <v-select
            v-model="technology"
            :items="technologies"
            label="Technology"
            outlined
            clearable
            dense
          >
          </v-select>
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
    <template #body v-if="checkedList.length > 0">
      <PageBody col="1">
        <template #c-1>
          <Table v-if="listFiltered.length > 0">
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
              <tr v-for="item in listPaginated[pageCurrent - 1]" :key="item.id">
                <td>
                  <TableLink
                    :link="`/repositories/${item.id}`"
                    :text="item.name"
                  />
                </td>
                <td>
                  <TableLink
                    :link="`/users/${item.creatorId}`"
                    :text="item.creatorName"
                  />
                </td>
                <td>
                  <TableText :text="item.language" />
                </td>
                <td>
                  <TableText :text="item.technology" />
                </td>
                <td>
                  <TableIcon
                    :item="item.id"
                    :action="deleteFromMyList"
                    color="red"
                    icon="mdi-minus-circle"
                  />
                </td>
              </tr>
            </template>
            <template #table-pagination>
              <v-pagination
                v-model="pageCurrent"
                :length="listPaginated.length"
              />
            </template>
          </Table>
          <Card v-else>Поиск не дал результата</Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { filterMixin } from '../../../mixins/filterMixin'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchCategories } from '~/functions/language-technologies'
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  mixins: [filterMixin, paginationMixin],
  data() {
    return {
      pageSize: 10
    }
  },
  computed: {
    checkedList() {
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
    title: `Profiler - My Repositories`
  },
  async asyncData() {
    try {
      return {
        allRepositories: await fetchAllRepositories(),
        languages: await fetchCategories()
      }
    } catch (e) {}
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteRepository', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.error(`You delete repository`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    }
  }
}
</script>
