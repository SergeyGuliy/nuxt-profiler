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
            :link="`/${$store.getters.profile}/my_repositories/create`"
          />
        </template>
        <template v-if="checkedList.length > 0" #actions>
          <v-select
            v-model="pageSize"
            :items="[5, 10, 15]"
            label="Page size"
            style="max-width: 56px;"
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
    <template v-if="checkedList.length > 0" #body>
      <PageBody col="1">
        <template #c-1>
          <Table
            v-if="listFiltered.length > 0"
            :headers="['Name', 'Creator', 'Language', 'Technology']"
          >
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
import { controlRepositories } from '../../../mixins/controlRepositories'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchCategories } from '~/functions/language-technologies'
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  mixins: [controlRepositories, filterMixin, paginationMixin],
  async asyncData({ error }) {
    try {
      return {
        allRepositories: await fetchAllRepositories(),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch your data." })
    }
  },
  data() {
    return {
      pageSize: 10
    }
  },
  computed: {
    checkedList() {
      const myListIDS = this.$store.getters['repositories/repositories']
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
  }
}
</script>
