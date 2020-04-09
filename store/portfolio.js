import firebase from 'firebase/app'

export const actions = {
  async updatePortfolio({ commit, state }, { type = 'notSelected', work }) {
    try {
      if (type === 'add') {
        commit('pushPortfolioWork', work)
      } else if (type === 'remove') {
        commit('deletePortfolioWork', work)
      } else if (type === 'notSelected') {
        throw new Error(
          "You need to select what you like to do with ID. 'add' or 'remove' from your list"
        )
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/portfolio`)
        .set(state.portfolio)
    } catch (e) {
      console.log('Error Updating User Portfolio')
      console.log(e)
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
