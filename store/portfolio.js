import firebase from 'firebase/app'

export const actions = {
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

export const mutations = {
  setUserPortfolio(state, list) {
    state.repositories = list
  },
  cleanUserPortfolio(state) {
    state.portfolio = []
  },
  pushPortfolioWork(state, work) {
    state.portfolio.push(work)
  },
  deletePortfolioWork(state, key) {
    try {
      const IdToDelete = state.portfolio.findIndex(
        (idSearch) => idSearch.key === key
      )
      state.portfolio.splice(IdToDelete, 1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const state = () => ({
  portfolio: []
})

export const getters = {
  portfolio: (state) => state.portfolio
}
