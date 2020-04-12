/**
 * This store module contain logic to control logged in user list of repositories
 * @external store_repositories
 */
import firebase from 'firebase/app'

/**
 * @memberOf external:store_repositories
 * @property {Function} updateReposList    - This action will add or remove repository ID from list of my repositories ID's. After that will be called pushing user repositories ID's in to server
 */
export const actions = {
  /**
   * @async
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

/**
 * @memberOf external:store_repositories
 * @property {Function} setUserRepositories     - Commit filling local state. Called in action: 'fetchUserInfo'
 * @property {Function} cleanUserRepositories   - Clean local state. Called in action: 'logOut'
 * @property {Function} pushRepository         - Add repository to my list
 * @property {Function} deleteRepository       - Remove repository from my list
 */
export const mutations = {
  /** @param list {Array} */
  setUserRepositories(state, list) {
    state.repositories = list
  },
  cleanUserRepositories(state) {
    state.repositories = []
  },

  /** @param id {String} */
  pushRepository(state, id) {
    state.repositories.push(id)
  },

  /** @param id {String} */
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

/**
 * @memberOf external:store_repositories
 * @property {Function} repositories      - Return user list of repositories
 */
export const getters = {
  /** @returns {Array} */
  repositories: (state) => state.repositories
}
