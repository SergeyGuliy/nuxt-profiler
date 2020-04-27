import { setUpComponent } from '~/_fake_test_vue_setup'

// Import testing components
import EnterModal from '~/components/layout_components/EnterModal/EnterModal'
// Setup starting test

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(EnterModal)
    expect(wrapper.find('[href="#login"]').isVisible()).toBe(true)
    expect(wrapper.find('[href="#registration"]').isVisible()).toBe(true)
    // console.log(wrapper.find('[href="#login"]').text())

    expect(wrapper.find('#login.v-window-item--active').exists()).toBe(true)
    expect(wrapper.find('#registration.v-window-item--active').exists()).toBe(
      false
    )

    wrapper.find('[href="#registration"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('#login.v-window-item--active').exists()).toBe(false)
    expect(wrapper.find('#registration.v-window-item--active').exists()).toBe(
      true
    )
  })
})
