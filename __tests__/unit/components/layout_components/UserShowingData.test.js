import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import PageBody from '~/components/global_components/PageBody'
import Card from '~/components/global_components/CardItems/Card'
import CardRow from '~/components/global_components/CardItems/CardRow'
import CardTitle from '~/components/global_components/CardItems/CardTitle'
import CardRowTitle from '~/components/global_components/CardItems/CardRowTitle'
// Basic imports requirements for testing

// Import testing components
import UserShowingData from '~/components/pages_components/UserShowingData'

const components = {
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
Vue.use(Vuetify)
function setUpComponent(mountInfo) {
  return mount(UserShowingData, {
    localVue,
    vuetify: new Vuetify(),
    store: new Vuex.Store({
      state: {
        id: 'wqcewq8ecqweqw7ec',
        profile: 'Sergey',
        loggedIn: false
      },
      getters: {
        id: (s) => s.id,
        profile: (s) => s.profile,
        loggedIn: (s) => s.loggedIn
      }
    }),
    propsData: {
      data: mountInfo.data,
      allUsers: mountInfo.allUsers,
      allRepositories: mountInfo.allRepositories,
      allArticles: mountInfo.allArticles,
      gitApiInfo: mountInfo.gitApiInfo
    },
    stubs: ['router-link', 'router-view', 'nuxt', 'client-only'],
    methods: {
      formatAboutUser() {}
    }
  })
}

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    // Basic user info
    const mountInfo = {
      data: {
        lists: {
          friends: ['empty', 'user1', 'user999'],
          articles: ['empty', 'art1', 'art2', 'art999'],
          repositories: ['empty', 'rep1', 'rep2', 'rep3', 'rep999'],
          portfolio: [
            'empty',
            {
              cite: 'https://github-profiler-b5d56.firebaseapp.com/',
              name: 'Profiler (Vue CLI)'
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
            work_languages: [
              'empty',
              'HTML & CSS',
              'JavaScript',
              'Basic Knowledges'
            ],
            work_position: 'Developer',
            work_scope: 'Web development',
            work_status: 'Unemployed (searching)',
            work_technologies: ['Materialize', 'Bootstrap'],
            work_type: 'Freelancer'
          }
        }
      },
      allUsers: {
        user1: {
          id: 'user1',
          profile: 'user1'
        },
        user2: {
          id: 'user2',
          profile: 'user2'
        },
        user3: {
          id: 'user3',
          profile: 'user3'
        },
        user4: {
          id: 'user4',
          profile: 'user4'
        },
        user5: {
          id: 'user5',
          profile: 'user5'
        }
      },
      allArticles: {
        art1: {
          name: 'art1'
        },
        art2: {
          name: 'art2'
        },
        art3: {
          name: 'art3'
        },
        art4: {
          name: 'art4'
        },
        art5: {
          name: 'art5'
        }
      },
      allRepositories: {
        rep1: {
          name: 'rep1'
        },
        rep2: {
          name: 'rep2'
        },
        rep3: {
          name: 'rep3'
        },
        rep4: {
          name: 'rep4'
        },
        rep5: {
          name: 'rep5'
        }
      },
      gitApiInfo: {
        avatar_url: 'https://avatars1.githubusercontent.com/u/43864245?v=4',
        followers: 1,
        following: 2,
        public_repos: 3
      }
    }

    const wrapper = setUpComponent(mountInfo)

    expect(wrapper.find('#GitInfo').exists()).toBe(true)
    expect(wrapper.find('.git__actions a:nth-child(1) span').text()).toBe('1')
    expect(wrapper.find('.git__actions a:nth-child(2) span').text()).toBe('2')
    expect(wrapper.find('.git__actions a:nth-child(3) span').text()).toBe('3')

    expect(wrapper.find('.c-1 .Card .CardRow:nth-of-type(2)').text()).toBe(
      'Location: Uzhorod'
    )
    expect(wrapper.find('.c-1 .Card .CardRow:nth-of-type(3)').text()).toBe(
      'Date of birth: 1992-12-04'
    )
    expect(wrapper.find('.c-1 .Card .CardRow:nth-of-type(4)').text()).toBe(
      'Education: Lviv Polytechnic National University'
    )
  })
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    // Basic user info
    const mountInfo = {
      data: {
        lists: {
          friends: ['empty', 'user1', 'user999'],
          articles: ['empty', 'art1', 'art2', 'art999'],
          repositories: ['empty', 'rep1', 'rep2', 'rep3', 'rep999'],
          portfolio: [
            'empty',
            {
              cite: 'https://github-profiler-b5d56.firebaseapp.com/',
              name: 'Profiler (Vue CLI)'
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
            work_languages: [
              'empty',
              'HTML & CSS',
              'JavaScript',
              'Basic Knowledges'
            ],
            work_position: 'Developer',
            work_scope: 'Web development',
            work_status: 'Unemployed (searching)',
            work_technologies: ['Materialize', 'Bootstrap'],
            work_type: 'Freelancer'
          }
        }
      },
      allUsers: {
        user1: {
          id: 'user1',
          profile: 'user1'
        },
        user2: {
          id: 'user2',
          profile: 'user2'
        },
        user3: {
          id: 'user3',
          profile: 'user3'
        },
        user4: {
          id: 'user4',
          profile: 'user4'
        },
        user5: {
          id: 'user5',
          profile: 'user5'
        }
      },
      allArticles: {
        art1: {
          name: 'art1'
        },
        art2: {
          name: 'art2'
        },
        art3: {
          name: 'art3'
        },
        art4: {
          name: 'art4'
        },
        art5: {
          name: 'art5'
        }
      },
      allRepositories: {
        rep1: {
          name: 'rep1'
        },
        rep2: {
          name: 'rep2'
        },
        rep3: {
          name: 'rep3'
        },
        rep4: {
          name: 'rep4'
        },
        rep5: {
          name: 'rep5'
        }
      },
      gitApiInfo: false
    }

    const wrapper = setUpComponent(mountInfo)
    expect(wrapper.find('#GitInfo').exists()).toBe(false)
  })
})
