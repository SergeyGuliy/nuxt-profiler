// Basic imports requirements for testing
import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

// Import testing components
import PageBody from '~/components/global_components/PageBody'
// Setup starting test

const localVue = createLocalVue()

Vue.use(Vuetify)
function setUpComponent(col) {
  return mount(PageBody, {
    localVue,
    vuetify: new Vuetify(),
    stubs: ['router-link', 'router-view', 'nuxt'],
    slots: {
      'c-1': `<div class='c-1'>c-1</div>`,
      'c-2': `<div class='c-2'>c-2</div>`,
      'c-3': `<div class='c-3'>c-3</div>`
    },
    propsData: {
      col
    }
  })
}

describe('PageBody.vue', () => {
  it('create with 1 column', function() {
    const wrapper = setUpComponent('1')
    expect(wrapper.find(`.c-1`).exists()).toBe(true)
    expect(wrapper.find(`.c-2`).exists()).toBe(false)
    expect(wrapper.find(`.c-3`).exists()).toBe(false)
  })
  it('create with 2 column', function() {
    const wrapper = setUpComponent('2')
    expect(wrapper.find(`.c-1`).exists()).toBe(true)
    expect(wrapper.find(`.c-2`).exists()).toBe(true)
    expect(wrapper.find(`.c-3`).exists()).toBe(false)
  })
  it('create with 3 column', function() {
    const wrapper = setUpComponent('3')
    expect(wrapper.find(`.c-1`).exists()).toBe(true)
    expect(wrapper.find(`.c-2`).exists()).toBe(true)
    expect(wrapper.find(`.c-3`).exists()).toBe(true)
  })
  it("create with 'undefined' column", function() {
    const wrapper = setUpComponent()
    expect(wrapper.find(`.c-1`).exists()).toBe(false)
    expect(wrapper.find(`.c-2`).exists()).toBe(false)
    expect(wrapper.find(`.c-3`).exists()).toBe(false)
  })
})
