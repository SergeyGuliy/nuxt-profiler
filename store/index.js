/**
 * Store map:
 * - [index.js]{@link external:store_index}                 - This store module contain logic with: logging in, registration, fetching data, and update data.
 * - [repositories.js]{@link external:store_repositories}   - This store module contain logic to control logged in user list of repositories
 * - [portfolio.js]{@link external:store_portfolio}         - This store module contain logic to control logged in user list of portfolio works
 * - [articles.js]{@link external:store_articles}           - This store module contain logic to control logged in user fist of articles
 * - [friends.js]{@link external:store_friends}             - This store module contain logic to control logged in user list of friends
 * @namespace store
 */

/**
 * This store module contain logic with: logging in, registration, fetching data, and update data.
 * @external store_index
 */
import firebase from 'firebase/app'
export const strict = false

/**
 * @memberOf external:store_index
 * @property {Function} nuxtServerInit     - Call 'fetchUserInfo' [nuxtServerInit]{@link function#nuxtServerInit}on server side (if access token available), else call 'logOut'
 * @property {Function} fetchUserInfo      - Fetch user info, spits it between modules: articles, friends, portfolio, repositories, index
 * @property {Function} createNewUser      - Create new user in database, basic info, set cookies and call 'fetchUserInfo'
 * @property {Function} logIn              - Log in in base, set cookies and call 'fetchUserInfo'
 * @property {Function} logOut             - Log out from base, clean cookies, clean all states in all modules
 * @property {Function} updateUserInfo     - Commit 'updateUserInfo' and update info to database
 * @property {Function} changeTheme        - Commit 'toggleTheme' and update info to database
 * @property {Function} changeAdminStatus  - Commit 'changeAdminStatus' and update info to database
 */
export const actions = {
  /**
   * @param app {Object} - SSR context
   * @returns {Promise<void>}
   */
  async nuxtServerInit({ dispatch }, { app }) {
    try {
      // I am using cookies to be able fetch user info while server rendering.
      // Because 'firebase.auth().currentUser.uid' can't be invoked in server side.
      const cookie = app.$cookies.get('access_token')
      await dispatch('fetchUserInfo', cookie)
    } catch (e) {
      console.log(`Error in store action 'nuxtServerInit': ${e}`)
      await dispatch('logOut')
    }
  },

  /**
   * @param uid {string}
   * @returns {Promise<void>}
   */
  async fetchUserInfo({ commit, dispatch, getters }, uid) {
    try {
      const userInfo = (
        await firebase
          .database()
          .ref(`/1_users/${uid}/`)
          .once('value')
      ).val()
      commit('setUser', {
        id: userInfo.id,
        isAdmin: userInfo.isAdmin,
        profile: userInfo.profile,
        userInfo: userInfo.userInfo,
        themeDark: userInfo.themeDark
      })
      commit('friends/setUserFriends', userInfo.lists.friends)
      commit('articles/setUserArticles', userInfo.lists.articles)
      commit('repositories/setUserRepositories', userInfo.lists.repositories)
      commit('portfolio/setUserPortfolio', userInfo.lists.portfolio)
    } catch (e) {
      // If fetching user info will throw an error,
      // will be invoked logging out user from base
      console.log(`Error in store action 'fetchUserInfo': ${e}`)
      await dispatch('logOut')
    }
  },

  /**
   * @param data {Object}
   * @returns {Promise<void>}
   */
  async createNewUser({ commit, dispatch, getters }, data) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
      const uid = (await firebase.auth().currentUser).uid
      await firebase
        .database()
        .ref(`/1_users/${uid}`)
        .set({
          id: uid,
          profile: data.email.split('@')[0],
          isAdmin: false,
          themeDark: true,
          userInfo: {
            info: {
              first_name: '',
              last_name: '',
              date_of_birth: '',
              about: '',
              location: '',
              education: ''
            },
            contacts: {
              email: data.email,
              facebook: '',
              git_type: '',
              github: '',
              gitApi: '',
              linkedIn: '',
              phone_code: '',
              phone: '',
              site: '',
              skype: ''
            },
            work: {
              work_status: '',
              work_type: '',
              work_position: '',
              work_scope: '',
              work_languages: ['empty'],
              work_technologies: ['empty']
            }
          },
          lists: {
            // This is not correctly, but this decision is need for correctly working Firebase database.
            // Because if you create in Firebase database empty array it will be immediately removed.
            // I will be able to create in all pages checking is array exists, abd if not it will create new array with item,
            // but it will bring a lot of extra code in all pages, so i decide to create arrays with first item 'empty'
            // In all pages are used filtrating to dont showing this 'empty'
            friends: ['empty'],
            articles: ['empty'],
            repositories: ['empty'],
            portfolio: ['empty']
          }
        })
      this.$cookies.set('access_token', uid)
      await dispatch('fetchUserInfo', uid)
      this.$router.push(`/${getters.profile}/edit_profile`)
    } catch (e) {
      console.log(`Error in store action 'createNewUser': ${e}`)
      throw e
    }
  },

  /**
   * @param data {Object}
   * @returns {Promise<void>}
   */
  async logIn({ commit, dispatch }, data) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
      const uid = await (await firebase.auth().currentUser).uid
      this.$cookies.set('access_token', uid)
      await dispatch('fetchUserInfo', uid)
    } catch (e) {
      console.log(`Error in store action 'logIn': ${e}`)
      throw e
    }
  },

  /**
   * @returns {Promise<void>}
   */
  async logOut({ commit }) {
    try {
      await firebase.auth().signOut()
      this.$cookies.remove('access_token')
      commit('cleanUser')
      commit('repositories/cleanUserRepositories')
      commit('portfolio/cleanUserPortfolio')
      commit('friends/cleanUserFriends')
      commit('articles/cleanUserArticles')
    } catch (e) {
      this.$cookies.remove('access_token')
      commit('cleanUser')
      commit('repositories/cleanUserRepositories')
      commit('portfolio/cleanUserPortfolio')
      commit('friends/cleanUserFriends')
      commit('articles/cleanUserArticles')
    }
  },

  /**
   * @param newUserInfo {Object}
   * @returns {Promise<void>}
   */
  async updateUserInfo({ getters, commit }, newUserInfo) {
    try {
      commit('updateUserInfo', newUserInfo)
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/userInfo`)
        .set(getters.userInfo)
    } catch (e) {
      console.log(`Error in store action 'updateUserInfo': ${e}`)
    }
  },

  /**
   * @returns {Promise<void>}
   */
  async changeTheme({ getters, commit }) {
    try {
      commit('toggleTheme')
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/themeDark`)
        .set(getters.user.themeDark)
    } catch (e) {
      console.log(`Error in store action 'changeTheme': ${e}`)
    }
  },

  /**
   * @param status {Boolean}
   * @returns {Promise<void>}
   */
  async changeAdminStatus({ getters, commit }, status) {
    try {
      commit('changeAdminStatus', status)
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/isAdmin`)
        .set(getters.user.isAdmin)
    } catch (e) {
      console.log(`Error in store action 'changeAdminStatus': ${e}`)
    }
  }
}

/**
 * @memberOf external:store_index
 * @property {Function} setUser             - Set's loaded user info into storage
 * @property {Function} cleanUser           - Cleaning user info from storage
 * @property {Function} toggleTheme         - Change user default theme
 * @property {Function} changeAdminStatus   - Change user admin status
 * @property {Function} updateUserInfo      - Update user info in state
 *
 */
export const mutations = {
  /** @param user {Object} */
  setUser(state, user) {
    state.user = user
  },

  cleanUser(state) {
    state.user = ''
  },
  toggleTheme(state) {
    state.user.themeDark = !state.user.themeDark
  },

  /** @param status {Boolean} */
  changeAdminStatus(state, status) {
    state.user.isAdmin = status
  },

  /** @param newUserInfo {Object} */
  updateUserInfo(state, newUserInfo) {
    state.user.userInfo = Object.assign({}, newUserInfo)
  }
}

export const state = () => ({
  user: ''
})

/**
 * @memberOf external:store_index
 * @property {Function} user        - Return user all info (isAdmin, themeDark, id, profile, ...)
 * @property {Function} userInfo    - Return user info (work, info, contacts)
 * @property {Function} loggedIn    - Return are user logged In (true/false)
 * @property {Function} profile     - Return user profile id (used in routes)
 * @property {Function} id          - Return user id
 * @property {Function} isAdmin     - Return user admin status
 * @property {Function} themeDark   - Return user theme status
 */
export const getters = {
  /** @returns {string} */
  user: (state) => state.user,

  /** @returns {string} */
  userInfo: (state) => state.user.userInfo,

  /** @returns {Boolean} */
  loggedIn: (state) => Boolean(state.user),

  /** @returns {string} */
  profile: (state) => state.user.profile,

  /** @returns {string} */
  id: (state) => state.user.id,

  /** @returns {Boolean} */
  isAdmin: (state) => state.user.isAdmin,

  /** @returns {Boolean} */
  themeDark: (state) => state.user.themeDark
}
