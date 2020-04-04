<template>
  <Page id="myPortfolio">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            listFiltered.length > 0
              ? 'List of my Works'
              : 'Your portfolio is empty'
          }}
          <BtnCreate
            :link="`/${$store.getters.user.profile}/my_portfolio/create`"
          />
        </template>
        <template #actions v-if="listFiltered.length > 0">
          <v-select
            :items="[3, 5, 7, 9]"
            v-model="pageSize"
            label="Page size"
            style="max-width: 56px;"
          />
        </template>
      </PageHeader>
    </template>
    <template #body v-if="listFiltered.length > 0">
      <div class="flex-portfolio">
        <PortfolioList :checkedList="listPaginated[pageCurrent - 1]" />
        <v-pagination v-model="pageCurrent" :length="listPaginated.length" />
      </div>
    </template>
  </Page>
</template>

<script>
import { paginationMixin } from '~/mixins/paginationMixin'
export default {
  name: 'MyPortfolio',
  mixins: [paginationMixin],
  data() {
    return {
      pageSize: 3
    }
  },
  computed: {
    listFiltered() {
      return this.allWorks.filter((item) => {
        return item !== 'empty'
      })
    }
  },
  asyncData({ store }) {
    try {
      return {
        allWorks: store.getters.user.lists.portfolio
      }
    } catch (e) {}
  },
  head: {
    title: `Profiler - My Portfolio`
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deletePortfolioWork', id)
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
