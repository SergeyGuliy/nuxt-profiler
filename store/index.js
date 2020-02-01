import firebase from 'firebase'

export default {
  state: {
    user: ''
  },
  getters: {
    user: (s) => s.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    cleanUser(state) {
      state.user = ''
    }
  },
  actions: {
    async getUID() {
      return (await firebase.auth().currentUser).uid
    },
    async fetchUserInfo({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUID')
        const userInfo = (
          await firebase
            .database()
            .ref(`/1_users/${uid}/`)
            .once('value')
        ).val()
        console.log(userInfo)
        commit('setUser', userInfo)
      } catch (e) {
        console.log(e)
      }
    },
    async createNewUser({ commit, dispatch }, data) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
        const uid = await dispatch('getUID')
        await firebase
          .database()
          .ref(`/1_users/${uid}`)
          .set({
            id: uid,
            profile: data.email.split('@')[0],
            isAdmin: false,
            userInfo: {
              info: {
                first_name: '',
                last_name: '',
                date_of_birth: '',
                about: '',
                location: ''
              },
              contacts: {
                email: data.email,
                facebook: '',
                github: '',
                linkedIn: '',
                phone: '',
                site: ''
              },
              work: {
                work_status: '',
                work_type: '',
                work_position: '',
                work_languages: '',
                work_technologies: ''
              }
            },
            lists: {
              friends: '',
              repositories: '',
              articles: ''
            }
          })
        await dispatch('fetchUserInfo')
      } catch (e) {
        console.log(e)
      }
    },
    async logIn({ commit, dispatch }, data) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
        await dispatch('fetchUserInfo')
      } catch (e) {
        console.log(e)
      }
    },
    async logOut({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('cleanUser')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
