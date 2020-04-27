// Basic imports requirements for testing
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

// Import testing components
import Navbar from '~/components/layout_components/Navbar'

// Setup starting test

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuetify)

function setUpComponent(loggedIn, isAdmin) {
  return mount(Navbar, {
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
        loggedIn,
        isAdmin,
        profile: 'sergey'
      },
      getters: {
        loggedIn: (s) => s.loggedIn,
        isAdmin: (s) => s.isAdmin,
        profile: (s) => s.profile
      }
    }),
    stubs: ['router-link', 'router-view']
  })
}

// Start test

describe('Navbar.vue', () => {
  it('if user logged in, and he is admin', () => {
    const wrapper = setUpComponent(true, true)
    expect(wrapper.find(`.v-toolbar__content`).exists()).toBe(true)
    expect(wrapper.find(`.v-toolbar__extension`).exists()).toBe(true)
    expect(wrapper.find(`.v-dialog__container`).exists()).toBe(false)
    expect(
      wrapper.find(`.v-toolbar__extension > .NavLink:nth-child(2)`).text()
    ).toBe('Admin panel')
  })
  it('if user logged in, and he is not admin', () => {
    const wrapper = setUpComponent(true, false)
    expect(wrapper.find(`.v-toolbar__content`).exists()).toBe(true)
    expect(wrapper.find(`.v-toolbar__extension`).exists()).toBe(true)
    expect(wrapper.find(`.v-dialog__container`).exists()).toBe(false)
    expect(
      wrapper.find(`.v-toolbar__extension > .NavLink:nth-child(2)`).text()
    ).toBe('My friends')
  })
  it('if user not logged in', () => {
    const wrapper = setUpComponent(false, false)
    expect(wrapper.find(`.v-toolbar__extension`).exists()).toBe(false)
    expect(wrapper.find(`.v-dialog__container`).exists()).toBe(true)
  })
})
