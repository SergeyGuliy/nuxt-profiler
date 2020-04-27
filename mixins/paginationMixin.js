/**
 * Mixins of the app. Map:
 * - [controlArticles.js]{@link external:mixins_controlArticles}           - This mixin contains logic to add or remove article to my list
 * - [controlFriends.js]{@link external:mixins_controlFriends}             - This mixin contains logic to add or remove user to my list
 * - [controlRepositories.js]{@link external:mixins_controlRepositories}   - This mixin contains logic to add or remove repository to my list
 * - [filterMixin.js]{@link external:mixins_filterMixin}                   - This mixin contains logic to filter articles and repositories
 * - [paginationMixin.js]{@link external:mixins_paginationMixin}           - This mixin contains logic chunk list of items, and puginate pages
 * @namespace mixins
 */

/**
 * This mixin contains logic with control pagination in pages with lists of users, articles, repositories, portfolio works
 * @external mixins_paginationMixin
 */
import { chunk } from 'lodash'
export const paginationMixin = {
  /**
   * @memberOf external:mixins_paginationMixin
   * @returns {{pageSize: {Number}, pageCurrent: {Number}}}
   */
  data() {
    return {
      pageCurrent: 1,
      pageSize: 7
    }
  },
  computed: {
    /**
     * Computed. Returns chunked list of listFiltered
     * @memberOf external:mixins_paginationMixin
     * @returns {Array}
     */
    listPaginated() {
      return chunk(this.listFiltered, this.pageSize)
    }
  },
  watch: {
    /**
     * If this.language will be changed, this.pageCurrent will be set to 1
     * @memberOf external:mixins_paginationMixin
     */
    language() {
      this.pageCurrent = 1
    },
    /**
     * If this.technology will be changed, this.pageCurrent will be set to 1
     * @memberOf external:mixins_paginationMixin
     */
    technology() {
      this.pageCurrent = 1
    },
    /**
     * If this.searchKey will be changed, this.pageCurrent will be set to 1
     * @memberOf external:mixins_paginationMixin
     */
    searchKey() {
      this.pageCurrent = 1
    },
    /**
     * If this.pageSize will be changed, this.pageCurrent will be set to 1
     * @memberOf external:mixins_paginationMixin
     */
    pageSize() {
      this.pageCurrent = 1
    }
  }
}
