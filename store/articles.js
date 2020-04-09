import firebase from 'firebase/app'

export const actions = {
  /**
   * This action will add or remove article ID from list of my articles ID's
   * After that will be called pushing user articles ID's in to server
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

export const mutations = {
  setUserArticles(state, list) {
    state.articles = list
  },
  cleanUserArticles(state) {
    state.articles = []
  },
  pushArticle(state, id) {
    state.articles.push(id)
  },
  deleteArticle(state, id) {
    const IdToDelete = state.articles.findIndex((idSearch) => idSearch === id)
    state.articles.splice(IdToDelete, 1)
  }
}

export const state = () => ({
  articles: []
})

export const getters = {
  articles: (state) => state.articles
}
