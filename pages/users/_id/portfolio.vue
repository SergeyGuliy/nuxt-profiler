<template>
  <Page id="userPortfolio">
    <template #head>
      <PageHeader>
        <template #title>{{ headerText }}</template>
        <template v-if="checkedList.length > 0" #actions>
          <v-select
            v-model="pageSize"
            :items="[3, 5, 7, 9]"
            label="Page size"
            style="max-width: 56px;"
          />
        </template>
      </PageHeader>
    </template>
    <template v-if="checkedList.length > 0" #body>
      <div class="flex-portfolio">
        <PortfolioList :checked-list="listPaginated[pageCurrent - 1]" />
        <v-pagination v-model="pageCurrent" :length="listPaginated.length" />
      </div>
    </template>
  </Page>
</template>

<script>
import PortfolioList from '../../../components/pages_components/PortfolioList'
import { fetchUserByID } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'

export default {
  name: 'Portfolio',
  components: { PortfolioList },
  mixins: [paginationMixin],
  async asyncData({ route, error }) {
    try {
      return {
        userData: await fetchUserByID(route.params.id)
      }
    } catch (e) {
      error({ message: "Can't fetch user portfolio." })
    }
  },
  data() {
    return {
      pageSize: 3
    }
  },
  computed: {
    checkedList() {
      return this.userData.lists.portfolio.filter((item) => {
        return item !== 'empty'
      })
    },
    headerText() {
      return this.checkedList.length > 0
        ? `${this.userName} portfolio works`
        : `${this.userName} don't have portfolio works`
    },
    userName() {
      return this.userData.userInfo.info.first_name &&
        this.userData.userInfo.info.last_name
        ? `${this.userData.userInfo.info.first_name} ${this.userData.userInfo.info.last_name}`
        : `${this.userData.profile}`
    }
  },
  head: {
    title: `Profiler - User Portfolio`
  }
}
</script>
