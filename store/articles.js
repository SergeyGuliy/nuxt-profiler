/**
 * This store module contain logic to control logged in user fist of articles
 * @external store_articles
 */
import firebase from 'firebase/app'

/**
 * @memberOf external:store_articles
 * @property {Function} updateArticlesList    - This action will add or remove article ID from list of my articles ID's. After that will be called pushing user articles ID's in to server
 */
export const actions = {
  /**
   * @async
   * @param {string} type 'add' will call commit 'pushArticle'
   * @param {string} type 'remove' will call commit 'deleteArticle'
   * @param {string} id to 'add' or 'remove' from my list of ID's
   * @returns {Promise<void>}
   */
  async updateArticlesList({ state, commit }, { type, id }) {
    try {
      if (type === 'add') {
        commit('pushArticle', id)
      } else if (type === 'remove') {
        commit('deleteArticle', id)
      } else {
        throw new Error('Need select what you like to do with ID. add/remove')
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/articles`)
        .set(state.articles)
    } catch (e) {
      console.log(`Error in store action 'updateArticlesList': ${e}`)
    }
  }
}

/**
 * @memberOf external:store_articles
 * @property {Function} setUserArticles     - Commit filling local state. Called in action: 'fetchUserInfo'
 * @property {Function} cleanUserArticles   - Clean local state. Called in action: 'logOut'
 * @property {Function} pushArticle         - Add article to my list
 * @property {Function} deleteArticle       - Remove article from my list
 */
export const mutations = {
  /** @param list {Array} */
  setUserArticles(state, list) {
    state.articles = list
  },

  cleanUserArticles(state) {
    state.articles = []
  },

  /** @param id {String} */
  pushArticle(state, id) {
    state.articles.push(id)
  },

  /** @param id {String} */
  deleteArticle(state, id) {
    const IdToDelete = state.articles.findIndex((idSearch) => idSearch === id)
    state.articles.splice(IdToDelete, 1)
  }
}

export const state = () => ({
  articles: []
})

/**
 * @memberOf external:store_articles
 * @property {Function} articles      - Return user list of articles
 */
export const getters = {
  /** @returns {Array} */
  articles: (state) => state.articles
}
