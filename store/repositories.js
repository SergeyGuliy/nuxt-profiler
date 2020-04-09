import firebase from 'firebase/app'

export const actions = {
  /**
   * This action will add or remove repository ID from list of my repositories ID's
   * After that will be called pushing user repositories ID's in to server
   * @param {string} type 'add' will call commit 'pushRepository'
   * @param {string} type 'remove' will call commit 'deleteRepository'
   * @param {string} id to 'add' or 'remove' from my list of ID's
   * @returns {Promise<void>}
   */
  async updateReposList({ state, commit }, { type, id }) {
    try {
      if (type === 'add') {
        commit('pushRepository', id)
      } else if (type === 'remove') {
        commit('deleteRepository', id)
      } else {
        throw new Error('Need select what you like to do with ID. add/remove')
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/repositories`)
        .set(state.repositories)
    } catch (e) {
      console.log(`Error in store action 'updateRepositoriesList': ${e}`)
    }
  }
}

export const mutations = {
  setUserRepositories(state, list) {
    state.repositories = list
  },
  cleanUserRepositories(state) {
    state.repositories = []
  },
  pushRepository(state, id) {
    state.repositories.push(id)
  },
  deleteRepository(state, id) {
    const IdToDelete = state.repositories.findIndex(
      (idSearch) => idSearch === id
    )
    state.repositories.splice(IdToDelete, 1)
  }
}

export const state = () => ({
  repositories: []
})

export const getters = {
  repositories: (state) => state.repositories
}
