<template>
  <Page id="myRepositories">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            myList.length > 0
              ? 'List of my repositories'
              : "You don't have repositories"
          }}
          <v-btn
            v-if="myList.length > 0"
            @click="
              $router.push(
                `/${$store.getters.user.profile}/my_repositories/create`
              )
            "
            color="green"
            absolute
            bottom
            right
          >
            Create
          </v-btn>
        </template>
        <template #actions v-if="myList.length > 0">
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
        <template #actions v-else>
          <v-btn
            v-if="!myList.length > 0"
            @click="
              $router.push(
                `/${$store.getters.user.profile}/my_repositories/create`
              )
            "
            color="green"
            class="mx-1"
            >Create</v-btn
          >
        </template>
      </PageHeader>
    </template>
    <template #body v-if="myList.length > 0">
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
              <tr v-for="item in listFiltered" :key="item.id">
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
          <Card v-else>Поиск не дал результата</Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchCategories } from '~/functions/language-technologies'
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  data() {
    return {
      language: null,
      technology: null,
      searchKey: null
    }
  },
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
    },
    listFiltered() {
      if (this.language) {
        if (this.technology) {
          if (this.searchKey) {
            return this.myList.filter((value) => {
              return (
                value.technology === this.technology &&
                value.language === this.language &&
                value.name.toLowerCase().includes(this.searchKey.toLowerCase())
              )
            })
          } else {
            return this.myList.filter((value) => {
              return value.technology === this.technology
            })
          }
        } else if (this.searchKey) {
          return this.myList.filter((value) => {
            return (
              value.language === this.language &&
              value.name.toLowerCase().includes(this.searchKey.toLowerCase())
            )
          })
        } else {
          return this.myList.filter((value) => {
            return value.language === this.language
          })
        }
      } else if (this.searchKey) {
        return this.myList.filter((value) => {
          return value.name.toLowerCase().includes(this.searchKey.toLowerCase())
        })
      } else {
        return this.myList
      }
    },
    technologies() {
      if (this.language) {
        return this.languages[this.language].technologies || []
      } else {
        return []
      }
    }
  },
  watch: {
    language() {
      this.technology = null
    }
  },
  head: {
    title: `Profiler - User Repositories`
  },
  async asyncData() {
    try {
      return {
        allRepositories: await fetchAllRepositories(),
        languages: await fetchCategories()
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

<style lang="sass">
#myRepositories
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
