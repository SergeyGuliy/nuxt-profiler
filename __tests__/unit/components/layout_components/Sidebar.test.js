// Basic imports requirements for testing
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

// Import testing components
import Sidebar from '~/components/layout_components/Sidebar'

// Setup starting test

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuetify)
function setUpComponent(loggedIn, isAdmin) {
  return mount(Sidebar, {
    localVue,
    vuetify: new Vuetify(),
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
    stubs: ['router-link', 'router-view'],
    propsData: {
      sidebarStatus: true
    }
  })
}

// Start test

describe('Sidebar.vue', () => {
  it('if user logged in, and he is admin', () => {
    const wrapper = setUpComponent(true, true)
    expect(wrapper.find(`.basic`).exists()).toBe(true)
    expect(wrapper.find(`.loggedIn`).exists()).toBe(true)
    expect(
      wrapper
        .find(
          `.loggedIn > .SideLink:nth-child(3) > .v-list-item__content > .v-list-item__title`
        )
        .text()
    ).toBe('Admin panel')
  })
  it('if user logged in, and he is not admin', () => {
    const wrapper = setUpComponent(true, false)
    expect(wrapper.find(`.basic`).exists()).toBe(true)
    expect(wrapper.find(`.loggedIn`).exists()).toBe(true)
    expect(
      wrapper
        .find(
          `.loggedIn > .SideLink:nth-child(3) > .v-list-item__content > .v-list-item__title`
        )
        .text()
    ).toBe('My friends')
  })
  it('if user not logged in', () => {
    const wrapper = setUpComponent(false, false)
    expect(wrapper.find(`.basic`).exists()).toBe(true)
    expect(wrapper.find(`.loggedIn`).exists()).toBe(false)
  })
})
