import firebase from 'firebase/app'
export const strict = false

/**
 * @type Object
 * @property {Function} nuxtServerInit
 * @property {Function} fetchUserInfo
 * @property {Function} createNewUser
 * @property {Function} logIn
 * @property {Function} logOut
 *
 */
export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    try {
      // I am using cookies to be able fetch user info while server rendering.
      // Because 'firebase.auth().currentUser.uid' can't be invoked in server side.
      const cookie = app.$cookies.get('access_token')
      await dispatch('fetchUserInfo', cookie)
    } catch (e) {
      await dispatch('logOut')
    }
  },

  async fetchUserInfo({ commit, dispatch, getters }, uid) {
    try {
      const userInfo = (
        await firebase
          .database()
          .ref(`/1_users/${uid}/`)
          .once('value')
      ).val()
      console.log(userInfo)
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
    } catch (e) {
      // If fetching user info will throw an error,
      // will be invoked logging out user from base
      console.log(
        'ALLARM!!! Something wrong while fetching user info. Check store!!!'
      )
      await dispatch('logOut')
    }
  },

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
      this.$router.push(`/${getters.user.profile}/edit_profile`)
    } catch (e) {
      console.log(e)
      throw e
    }
  },

  async logIn({ commit, dispatch }, data) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
      const uid = await (await firebase.auth().currentUser).uid
      this.$cookies.set('access_token', uid)
      await dispatch('fetchUserInfo', uid)
    } catch (e) {
      console.log(e)
    }
  },

  async logOut({ commit }) {
    try {
      await firebase.auth().signOut()
      this.$cookies.remove('access_token')
      commit('cleanUser')
      commit('repositories/cleanUserRepositories')
      commit('portfolio/cleanUserPortfolio')
      commit('friends/cleanUserFriends')
      commit('articles/cleanUserArticles')
      this.$dialog.message.success(`You logged out from base.`, {
        position: 'top-right',
        timeout: 3000
      })
    } catch (e) {
      this.$cookies.remove('access_token')
      commit('cleanUser')
      commit('repositories/cleanUserRepositories')
      commit('portfolio/cleanUserPortfolio')
      commit('friends/cleanUserFriends')
      commit('articles/cleanUserArticles')
    }
  },

  async updateUserInfo({ getters, commit }, newUserInfo) {
    try {
      commit('updateUserInfo', newUserInfo)
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/userInfo`)
        .set(getters.userInfo)
    } catch (e) {
      console.log('Error Updating User info')
      console.log(e)
    }
  },

  async changeTheme({ getters, commit }) {
    try {
      commit('toggleTheme')
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/themeDark`)
        .set(getters.user.themeDark)
    } catch (e) {
      console.log('Error Changing theme')
      console.log(e)
    }
  },
  async changeAdminStatus({ getters, commit }, status) {
    try {
      commit('changeAdminStatus', status)
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/isAdmin`)
        .set(getters.user.isAdmin)
    } catch (e) {
      console.log('Error Changing admin status')
      console.log(e)
    }
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  cleanUser(state) {
    state.user = ''
  },
  toggleTheme(state) {
    state.user.themeDark = !state.user.themeDark
  },
  changeAdminStatus(state, status) {
    state.user.isAdmin = status
  },
  updateUserInfo(state, newUserInfo) {
    state.user.userInfo = Object.assign({}, newUserInfo)
  }
}

export const state = () => ({
  user: ''
})

export const getters = {
  user: (state) => state.user,
  loggedIn: (state) => Boolean(state.user),
  profile: (state) => state.user.profile,
  id: (state) => state.user.id,
  isAdmin: (state) => state.user.isAdmin,
  userInfo: (state) => state.user.userInfo,
  themeDark: (state) => state.user.themeDark
}
