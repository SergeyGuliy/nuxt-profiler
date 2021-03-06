import { setUpComponent } from '~/_fake_test_vue_setup'

// Import testing components
import Login from '~/components/layout_components/EnterModal/Login'
// Setup starting test

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(Login)

    wrapper.vm.$store.dispatch('logOut')
    wrapper.find('.v-input:nth-child(1) input').setValue('sergey.92@gmail.com')
    wrapper.find('.v-input:nth-child(2) input').setValue('12312dd312d')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$store.getters.loggedIn).toBe(false)
    await wrapper.vm.$nextTick()

    wrapper.find('.row > .col-6:nth-child(1) > button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$store.getters.loggedIn).toBe(true)
  })
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(Login)

    wrapper.vm.$store.dispatch('logOut')
    wrapper.vm.$store._actions = {
      logIn(state) {
        throw new Error('cant log in')
      }
    }

    wrapper.find('.v-input:nth-child(1) input').setValue('sergey.92@gmail.com')
    wrapper.find('.v-input:nth-child(2) input').setValue('12312dd312d')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$store.getters.loggedIn).toBe(false)
    await wrapper.vm.$nextTick()

    wrapper.find('.row > .col-6:nth-child(1) > button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$store.getters.loggedIn).toBe(false)
  })
})
