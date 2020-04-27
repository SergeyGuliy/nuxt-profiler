import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VTooltip from 'v-tooltip'
import { mount, createLocalVue } from '@vue/test-utils'

import Table from '~/components/global_components/TableItems/Table'
import TableLink from '~/components/global_components/TableItems/TableLink'
import TableText from '~/components/global_components/TableItems/TableText'
import TableIcon from '~/components/global_components/TableItems/TableIcon'
import Page from '~/components/global_components/Page'
import PageHeader from '~/components/global_components/PageHeader'
import PageBody from '~/components/global_components/PageBody'
import Card from '~/components/global_components/CardItems/Card'
import CardRow from '~/components/global_components/CardItems/CardRow'
import CardTitle from '~/components/global_components/CardItems/CardTitle'
import CardRowTitle from '~/components/global_components/CardItems/CardRowTitle'
// Basic imports requirements for testing

// Import testing components

const components = {
  Table,
  TableLink,
  TableText,
  TableIcon,
  Page,
  PageHeader,
  PageBody,
  Card,
  CardRow,
  CardTitle,
  CardRowTitle
}
// Setup starting test

const localVue = createLocalVue()
Object.keys(components).forEach((key) => {
  localVue.component(key, components[key])
})

localVue.use(Vuex)
localVue.use(VTooltip)
Vue.use(Vuetify)

localVue.prototype.$dialog = {
  message: {
    success(text) {
      console.log(`Message success from: ${text}`)
    },
    error(text) {
      console.log(`Message error from: ${text}`)
    }
  },
  confirm() {
    return true
  }
}
localVue.prototype.$axios = {
  get() {
    return true
  }
}
export function setUpComponent(component, params, methods) {
  return mount(component, {
    localVue,
    vuetify: new Vuetify({
      mocks: {
        $vuetify: {
          theme: {
            dark: false
          }
        }
      }
    }),
    store: new Vuex.Store({
      state: {
        user: {
          id: 'WW5bGecIAtRHEXuPq0JXbPszzdD3',
          profile: 'sergey.guliy.92',
          isAdmin: true,
          themeDark: true,
          lists: {
            articles: ['empty', 'art1', 'art999'],
            repositories: ['empty', 'rep1', 'rep999'],
            friends: ['empty', 'user1', 'user999'],
            portfolio: [
              'empty',
              {
                cite: 'https://github-profiler-b5d56.firebaseapp.com/',
                creatorId: 'WW5bGecIAtRHEXuPq0JXbPszzdD3',
                creatorName: 'sergey.guliy.92',
                gitHub: 'https://github.com/SergeyGuliy/profiler',
                key: 1585672038720,
                name: 'Profiler (Vue CLI)'
              },
              {
                cite: 'http://vue-crib.surge.sh/',
                creatorId: 'WW5bGecIAtRHEXuPq0JXbPszzdD3',
                creatorName: 'sergey.guliy.92',
                gitHub: 'https://github.com/SergeyGuliy/vue-crib',
                key: 1585672079921,
                name: 'Vue Crib'
              }
            ]
          },
          userInfo: {
            contacts: {
              email: 'sergey.guliy.92@gmail.com',
              facebook: 'https://www.facebook.com/sergey.guliy.7',
              gitApi: 'https://api.github.com/users/SergeyGuliy',
              git_type: 'GitHub',
              github: 'https://github.com/SergeyGuliy',
              linkedIn: 'https://www.linkedin.com/in/sergey-guliy-082203183/',
              phone: '50-280-81-65',
              phone_code: '+380',
              site: 'http://165.22.203.186/',
              skype: 'live:sergey.guliy.92'
            },
            info: {
              about: 'I am junior Frontend developer.',
              date_of_birth: '1992-12-04',
              education: 'Lviv Polytechnic National University',
              first_name: 'Sergey',
              last_name: 'Guliy',
              location: 'Uzhorod'
            },
            work: {
              work_languages: ['empty', 'HTML & CSS'],
              work_position: 'Developer',
              work_scope: 'Web development',
              work_status: 'Unemployed (searching)',
              work_technologies: ['jQuery', 'Vue.js'],
              work_type: ''
            }
          }
        }
      },
      getters: {
        user: (s) => s.user,
        userInfo: (s) => s.user.userInfo,
        loggedIn: (s) => Boolean(s.user),
        profile: (s) => s.user.profile,
        id: (s) => s.user.id,
        isAdmin: (s) => s.user.isAdmin,
        themeDark: (s) => s.user.themeDark,
        'articles/articles': (s) => s.user.lists.articles,
        'repositories/repositories': (s) => s.user.lists.repositories,
        'friends/friends': (s) => s.user.lists.friends,
        'portfolio/portfolio': (s) => s.user.lists.portfolio
      },
      mutations: {
        logIn(state) {
          state.user = {
            id: 'WW5bGecIAtRHEXuPq0JXbPszzdD3',
            profile: 'sergey.guliy.92',
            isAdmin: true,
            themeDark: true,
            lists: {
              articles: ['empty', 'art1', 'art999'],
              repositories: ['empty', 'rep1', 'rep999'],
              friends: ['empty', 'user1', 'user999'],
              portfolio: [
                'empty',
                {
                  cite: 'https://github-profiler-b5d56.firebaseapp.com/',
                  creatorId: 'WW5bGecIAtRHEXuPq0JXbPszzdD3',
                  creatorName: 'sergey.guliy.92',
                  gitHub: 'https://github.com/SergeyGuliy/profiler',
                  key: 1585672038720,
                  name: 'Profiler (Vue CLI)'
                },
                {
                  cite: 'http://vue-crib.surge.sh/',
                  creatorId: 'WW5bGecIAtRHEXuPq0JXbPszzdD3',
                  creatorName: 'sergey.guliy.92',
                  gitHub: 'https://github.com/SergeyGuliy/vue-crib',
                  key: 1585672079921,
                  name: 'Vue Crib'
                }
              ]
            },
            userInfo: {
              contacts: {
                email: 'sergey.guliy.92@gmail.com',
                facebook: 'https://www.facebook.com/sergey.guliy.7',
                gitApi: 'https://api.github.com/users/SergeyGuliy',
                git_type: 'GitHub',
                github: 'https://github.com/SergeyGuliy',
                linkedIn: 'https://www.linkedin.com/in/sergey-guliy-082203183/',
                phone: '50-280-81-65',
                phone_code: '+380',
                site: 'http://165.22.203.186/',
                skype: 'live:sergey.guliy.92'
              },
              info: {
                about: 'I am junior Frontend developer.',
                date_of_birth: '1992-12-04',
                education: 'Lviv Polytechnic National University',
                first_name: 'Sergey',
                last_name: 'Guliy',
                location: 'Uzhorod'
              },
              work: {
                work_languages: ['empty', 'HTML & CSS'],
                work_position: 'Developer',
                work_scope: 'Web development',
                work_status: 'Unemployed (searching)',
                work_technologies: ['jQuery', 'Vue.js'],
                work_type: ''
              }
            }
          }
        },
        logOut(state) {
          state.user = ''
        },
        toggleTheme(state) {
          state.user.themeDark = !state.user.themeDark
        },
        pushArticle(state, id) {
          state.user.lists.articles.push(id)
        },
        deleteArticle(state, id) {
          const IdToDelete = state.user.lists.articles.findIndex(
            (idSearch) => idSearch === id
          )
          state.user.lists.articles.splice(IdToDelete, 1)
        },
        pushRepository(state, id) {
          state.user.lists.repositories.push(id)
        },
        deleteRepository(state, id) {
          const IdToDelete = state.user.lists.repositories.findIndex(
            (idSearch) => idSearch === id
          )
          state.user.lists.repositories.splice(IdToDelete, 1)
        },
        pushFriend(state, id) {
          state.user.lists.friends.push(id)
        },
        deleteFriend(state, id) {
          const IdToDelete = state.user.lists.friends.findIndex(
            (idSearch) => idSearch === id
          )
          state.user.lists.friends.splice(IdToDelete, 1)
        },
        pushPortfolioWork(state, work) {
          state.user.lists.portfolio.push(work)
        },
        deletePortfolioWork(state, key) {
          const IdToDelete = state.user.lists.portfolio.findIndex(
            (idSearch) => idSearch.key === key
          )
          state.user.lists.portfolio.splice(IdToDelete, 1)
        }
      },
      actions: {
        changeTheme({ commit }) {
          commit('toggleTheme')
        },
        logIn({ commit }) {
          commit('logIn')
        },
        logOut({ commit }) {
          commit('logOut')
        },
        createNewUser({ commit }) {
          commit('logIn')
        },
        'articles/updateArticlesList'({ state, commit }, { type, id }) {
          try {
            if (type === 'add') {
              commit('pushArticle', id)
            } else if (type === 'remove') {
              commit('deleteArticle', id)
            }
          } catch (e) {
            console.log(`Error in store action 'updateArticlesList': ${e}`)
          }
        },
        'repositories/updateReposList'({ state, commit }, { type, id }) {
          try {
            if (type === 'add') {
              commit('pushRepository', id)
            } else if (type === 'remove') {
              commit('deleteRepository', id)
            }
          } catch (e) {
            console.log(`Error in store action 'updateArticlesList': ${e}`)
          }
        },
        'friends/updateFriendsList'({ state, commit }, { type, id }) {
          try {
            if (type === 'add') {
              commit('pushFriend', id)
            } else if (type === 'remove') {
              commit('deleteFriend', id)
            }
          } catch (e) {
            console.log(`Error in store action 'updateFriendsList': ${e}`)
          }
        },
        'portfolio/updatePortfolio'({ commit, state }, { type, work }) {
          try {
            if (type === 'add') {
              commit('pushPortfolioWork', work)
            } else if (type === 'remove') {
              commit('deletePortfolioWork', work)
            }
          } catch (e) {
            console.log(`Error in store action 'updatePortfolio': ${e}`)
          }
        }
      }
    }),
    stubs: ['router-link', 'router-view', 'nuxt', 'client-only'],
    mocks: {
      $route: {
        params
      },
      $options: {
        asyncData() {}
      }
    },
    methods
  })
}
