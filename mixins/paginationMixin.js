import { chunk } from 'lodash'
export const paginationMixin = {
  data() {
    return {
      pageCurrent: 1,
      pageSize: 7
    }
  },
  computed: {
    listPaginated() {
      return chunk(this.listFiltered, this.pageSize)
    }
  },
  watch: {
    language() {
      this.pageCurrent = 1
    },
    technology() {
      this.pageCurrent = 1
    },
    searchKey() {
      this.pageCurrent = 1
    },
    pageSize() {
      this.pageCurrent = 1
    }
  }
}
