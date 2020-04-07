<template>
  <Page id="allRepositories">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            checkedList.length > 0
              ? 'List of public repositories'
              : 'There is no public repositories'
          }}
        </template>
        <template #actions v-if="checkedList.length > 0">
          <v-select
            :items="[5, 10, 15]"
            v-model="pageSize"
            label="Page size"
            style="max-width: 43px;"
          />
          <v-select
            v-model="language"
            :items="Object.keys(languages)"
            label="Language"
            clearable
          >
          </v-select>
          <v-select
            v-model="technology"
            :items="technologies"
            label="Technology"
            clearable
          >
          </v-select>
          <v-text-field v-model="searchKey" label="Search" clearable />
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
                <th v-if="$store.getters.user">Actions</th>
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
                <td v-if="$store.getters.user">
                  <TableIcon
                    v-if="
                      !$store.getters.user.lists.repositories.includes(item.id)
                    "
                    :item="item.id"
                    :action="addTomMyList"
                    color="green"
                    icon="mdi-plus-circle"
                  />
                  <TableIcon
                    v-else
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
import { filterMixin } from '../../mixins/filterMixin'
import { controlRepositories } from '../../mixins/controlRepositories'
import { paginationMixin } from '~/mixins/paginationMixin'
import {
  fetchAllRepositories,
  fetchPublicRepositoriesIDS
} from '~/functions/repositories'
import { fetchCategories } from '~/functions/language-technologies'
export default {
  name: 'Index',
  mixins: [controlRepositories, filterMixin, paginationMixin],
  transition: 'bounce',
  data() {
    return {
      pageSize: 10
    }
  },
  computed: {
    checkedList() {
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
      return publicListList
    }
  },
  head: {
    title: `Profiler - Public Repositories`
  },
  async asyncData({ error }) {
    try {
      return {
        allRepositories: await fetchAllRepositories(),
        publicRepositoriesIDS: await fetchPublicRepositoriesIDS(),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: 'Cannot fetch Repositories list' })
    }
  }
}
</script>
