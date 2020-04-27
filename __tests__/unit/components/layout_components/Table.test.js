// Basic imports requirements for testing
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

// Import testing components
import Table from '~/components/global_components/TableItems/Table'
// Setup starting test

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuetify)

function setUpComponent(loggedIn, headers) {
  return mount(Table, {
    localVue,
    vuetify: new Vuetify(),
    stubs: ['client-only'],
    slots: {
      'table-pagination': `<div class='Table'>Table</div>`
    },
    store: new Vuex.Store({
      state: {
        loggedIn,
        profile: 'sergey'
      },
      getters: {
        loggedIn: (s) => s.loggedIn,
        profile: (s) => s.profile
      }
    }),
    propsData: {
      headers
    }
  })
}

describe('PageBody.vue', () => {
  it('create with 1 column', function() {
    const wrapper = setUpComponent(true, [
      'Name',
      'Repositories',
      'Articles',
      'Friends'
    ])
    expect(wrapper.find('thead > tr > th:nth-child(1)').text()).toBe('Name')
    expect(wrapper.find('thead > tr > th:nth-child(2)').text()).toBe(
      'Repositories'
    )
    expect(wrapper.find('thead > tr > th:nth-child(3)').text()).toBe('Articles')
    expect(wrapper.find('thead > tr > th:nth-child(4)').text()).toBe('Friends')
    expect(wrapper.find('thead > tr > th:nth-child(5)').text()).toBe('Actions')
  })
  it('create with 1 column', function() {
    const wrapper = setUpComponent(false, [
      'Name',
      'Repositories',
      'Articles',
      'Friends'
    ])
    expect(wrapper.find('thead > tr > th:nth-child(1)').text()).toBe('Name')
    expect(wrapper.find('thead > tr > th:nth-child(2)').text()).toBe(
      'Repositories'
    )
    expect(wrapper.find('thead > tr > th:nth-child(3)').text()).toBe('Articles')
    expect(wrapper.find('thead > tr > th:nth-child(4)').text()).toBe('Friends')
    expect(wrapper.find('thead > tr > th:nth-child(5)').exists()).toBe(false)
  })
})
