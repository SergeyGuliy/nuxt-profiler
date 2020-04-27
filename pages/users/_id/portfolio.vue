<template>
  <Page id="userPortfolio">
    <template #head>
      <PageHeader>
        <template #title>{{ headerText }}</template>
        <template v-if="listFiltered.length > 0" #actions>
          <v-select
            v-model="pageSize"
            :items="[3, 5, 7, 9]"
            label="Page size"
            style="max-width: 56px;"
          />
        </template>
      </PageHeader>
    </template>
    <template v-if="listFiltered.length > 0" #body>
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

/**
 * ---(users/_id/portfolio.vue)--- Basic view of user portfolio.
 * @module pages/users/_id/portfolio
 *
 * @vue-event {Object(app, store, error)} asyncData - Return ['fetchUserByID']{@link external:functions_users}, ['fetchAllUsers']{@link external:functions_users}, ['fetchAllRepositories']{@link external:functions_repositories}, ['fetchAllArticles']{@link external:functions_articles}, else if user have gitApi will be fetch GitHub info of user.
 */
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
    listFiltered() {
      return this.userData.lists.portfolio.filter((item) => {
        return item !== 'empty'
      })
    },
    headerText() {
      return this.listFiltered.length > 0
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

<style lang="sass">
@import '~/assets/pages_styles/userPortfolio.sass'
</style>
