<template>
  <Page id="allArticles">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            publicList.length > 0
              ? 'List of public Articles'
              : 'There is no articles'
          }}
        </template>
        <template #actions v-if="publicList.length > 0">
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
    <template #body v-if="publicList.length > 0">
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
                <td>
                  <TableLink :link="`/articles/${item.id}`" :text="item.name" />
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
                    v-if="!$store.getters.user.lists.articles.includes(item.id)"
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
import { fetchAllArticles, fetchPublicArticlesIDS } from '~/functions/articles'
import { fetchCategories } from '~/functions/language-technologies'
export default {
  name: 'Index',
  data() {
    return {
      language: null,
      technology: null,
      searchKey: null
    }
  },
  computed: {
    publicList() {
      const publicListList = []
      for (const i of this.publicArticlesIDS) {
        try {
          const art = this.allArticles[i]
          art.id = i
          publicListList.push(art)
        } catch (e) {
          continue
        }
      }
      return publicListList
    },
    listFiltered() {
      if (this.language) {
        if (this.technology) {
          if (this.searchKey) {
            return this.publicList.filter((value) => {
              return (
                value.technology === this.technology &&
                value.language === this.language &&
                value.name.toLowerCase().includes(this.searchKey.toLowerCase())
              )
            })
          } else {
            return this.publicList.filter((value) => {
              return value.technology === this.technology
            })
          }
        } else if (this.searchKey) {
          return this.publicList.filter((value) => {
            return (
              value.language === this.language &&
              value.name.toLowerCase().includes(this.searchKey.toLowerCase())
            )
          })
        } else {
          return this.publicList.filter((value) => {
            return value.language === this.language
          })
        }
      } else if (this.searchKey) {
        return this.publicList.filter((value) => {
          return value.name.toLowerCase().includes(this.searchKey.toLowerCase())
        })
      } else {
        return this.publicList
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
    title: `Profiler - Public Articles`
  },
  async asyncData() {
    try {
      return {
        allArticles: await fetchAllArticles(),
        publicArticlesIDS: await fetchPublicArticlesIDS(),
        languages: await fetchCategories()
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteArticle', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.error(`You delete article`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {
        console.log(e)
      }
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushArticle', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.success(`You add article`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="sass">
#allArticles
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
