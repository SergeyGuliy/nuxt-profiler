/**
 * This store module contain logic to control logged in user list of portfolio works
 * @external store_portfolio
 */
import firebase from 'firebase/app'

/**
 * @memberOf external:store_portfolio
 * @property {Function} updatePortfolio    - This action will add or remove portfolio work to my portfolio. After that will be called pushing portfolio in to server
 */
export const actions = {
  /**
   * @async
   * @param {string} type 'add' will call commit 'pushPortfolioWork'
   * @param {string} type 'remove' will call commit 'deletePortfolioWork'
   * @param {Object} work to 'add' or 'remove' from my list
   * @returns {Promise<void>}
   */
  async updatePortfolio({ commit, state }, { type, work }) {
    try {
      if (type === 'add') {
        commit('pushPortfolioWork', work)
      } else if (type === 'remove') {
        commit('deletePortfolioWork', work)
      } else {
        throw new Error('Need select what you like to do with ID. add/remove')
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/portfolio`)
        .set(state.portfolio)
    } catch (e) {
      console.log(`Error in store action 'updatePortfolio': ${e}`)
    }
  }
}

/**
 * @memberOf external:store_portfolio
 * @property {Function} setUserPortfolio       - Commit filling local state. Called in action: 'fetchUserInfo'
 * @property {Function} cleanUserPortfolio     - Clean local state. Called in action: 'logOut'
 * @property {Function} pushPortfolioWork      - Add work to my portfolio
 * @property {Function} deletePortfolioWork    - Remove work from my portfolio
 */
export const mutations = {
  /** @param list {Array} */
  setUserPortfolio(state, list) {
    state.portfolio = list
  },
  cleanUserPortfolio(state) {
    state.portfolio = []
  },

  /** @param work {Object} */
  pushPortfolioWork(state, work) {
    state.portfolio.push(work)
  },

  /** @param key {String} */
  deletePortfolioWork(state, key) {
    try {
      const IdToDelete = state.portfolio.findIndex(
        (idSearch) => idSearch.key === key
      )
      state.portfolio.splice(IdToDelete, 1)
    } catch (e) {
      console.log(`Error in store mutation 'deletePortfolioWork': ${e}`)
    }
  }
}

export const state = () => ({
  portfolio: []
})

/**
 * @memberOf external:store_portfolio
 * @property {Function} portfolio      - Return user list of portfolio works
 */
export const getters = {
  /** @returns {Array} */
  portfolio: (state) => state.portfolio
}
