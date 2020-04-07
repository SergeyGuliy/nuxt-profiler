import firebase from 'firebase/app'
export const strict = false
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
      commit('setUser', userInfo)
    } catch (e) {
      // If fetching user info will throw an error, will be invoked logging out user from base
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
      this.$router.go()
    } catch (e) {
      throw e
    }
  },

  async logOut({ commit }) {
    try {
      await firebase.auth().signOut()
      this.$cookies.remove('access_token')
      commit('cleanUser')
      this.$router.go()
      this.$dialog.message.success(`You logged out from base.`, {
        position: 'top-right',
        timeout: 3000
      })
    } catch (e) {
      this.$cookies.remove('access_token')
      commit('cleanUser')
      this.$router.go()
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

  async updateFriendsList({ getters, commit }, { type, id }) {
    try {
      if (type === 'add') {
        commit('pushFriend', id)
      } else if (type === 'remove') {
        commit('deleteFriend', id)
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/friends`)
        .set(getters.userFriends)
    } catch (e) {
      console.log('Error Updating User Friends List')
      console.log(e)
    }
  },

  async updateArticlesList({ getters, commit }, { type, id }) {
    try {
      if (type === 'add') {
        commit('pushArticle', id)
      } else if (type === 'remove') {
        commit('deleteArticle', id)
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/articles`)
        .set(getters.userArticles)
    } catch (e) {
      console.log('Error Updating User Articles List')
      console.log(e)
    }
  },

  async updateRepositoriesList({ getters, commit }, { type, id }) {
    try {
      if (type === 'add') {
        commit('pushRepository', id)
      } else if (type === 'remove') {
        commit('deleteRepository', id)
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/repositories`)
        .set(getters.userRepositories)
    } catch (e) {
      console.log('Error Updating User Repositories List')
      console.log(e)
    }
  },

  async updatePortfolio({ getters, commit, state }, { type, work }) {
    try {
      if (type === 'add') {
        commit('pushPortfolioWork', work)
      } else if (type === 'remove') {
        commit('deletePortfolioWork', work)
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/portfolio`)
        .set(getters.userPortfolio)
    } catch (e) {
      console.log('Error Updating User Portfolio')
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
  toggleTheme(state) {
    state.user.themeDark = !state.user.themeDark
  },
  updateUserInfo(state, newUserInfo) {
    state.user.userInfo = Object.assign({}, newUserInfo)
  },
  setUser(state, user) {
    state.user = user
  },
  cleanUser(state) {
    state.user = ''
  },
  changeAdminStatus(state, status) {
    state.user.isAdmin = status
  },
  pushFriend(state, id) {
    state.user.lists.friends.push(id)
  },
  pushRepository(state, id) {
    state.user.lists.repositories.push(id)
  },
  pushArticle(state, id) {
    state.user.lists.articles.push(id)
  },
  pushPortfolioWork(state, work) {
    state.user.lists.portfolio.push(work)
  },
  deleteFriend(state, id) {
    const IdToDelete = state.user.lists.friends.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.friends.splice(IdToDelete, 1)
  },
  deleteRepository(state, id) {
    const IdToDelete = state.user.lists.repositories.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.repositories.splice(IdToDelete, 1)
  },
  deleteArticle(state, id) {
    const IdToDelete = state.user.lists.articles.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.articles.splice(IdToDelete, 1)
  },
  deletePortfolioWork(state, key) {
    try {
      const IdToDelete = state.user.lists.portfolio.findIndex(
        (idSearch) => idSearch.key === key
      )
      state.user.lists.portfolio.splice(IdToDelete, 1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const state = () => ({
  user: ''
})

export const getters = {
  user: (state) => state.user,
  userInfo: (state) => state.user.userInfo,
  userArticles: (state) => state.user.lists.articles,
  userRepositories: (state) => state.user.lists.repositories,
  userFriends: (state) => state.user.lists.friends,
  userPortfolio: (state) => state.user.lists.portfolio
}
