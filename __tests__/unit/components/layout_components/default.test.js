import { setUpComponent } from '~/_fake_test_vue_setup'

// Import testing components
import Defaults from '~/layouts/default'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(Defaults)
    const BtnLoggOut = wrapper.find('button.loggOut')
    const BtnLoggIn = wrapper.find('button.loggIn')
    const BtnToggleTheme = wrapper.find('button.toggleTheme')
    const ModalLogin = wrapper.find('div.v-dialog__container')

    expect(BtnToggleTheme.exists()).toBe(true)
    expect(BtnLoggOut.exists()).toBe(true)
    expect(BtnLoggIn.exists()).toBe(false)
    expect(ModalLogin.exists()).toBe(false)

    expect(wrapper.find('header.theme--dark').exists()).toBe(true)
    expect(wrapper.vm.$vuetify.theme.dark).toBe(true)
    expect(wrapper.vm.$store.getters.themeDark).toBe(true)

    BtnToggleTheme.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('header.theme--light').exists()).toBe(true)
    expect(wrapper.vm.$vuetify.theme.dark).toBe(false)
    expect(wrapper.vm.$store.getters.themeDark).toBe(false)
  })
  it('if user logged in, try to logg out ', async function() {
    const wrapper = setUpComponent(Defaults)
    const BtnLoggOut = wrapper.find('button.loggOut')
    const BtnLoggIn = wrapper.find('button.loggIn')
    const ModalLogin = wrapper.find('div.v-dialog__container')

    expect(BtnLoggOut.exists()).toBe(true)
    expect(BtnLoggIn.exists()).toBe(false)
    expect(ModalLogin.exists()).toBe(false)

    BtnLoggOut.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button.loggOut').exists()).toBe(false)
    expect(wrapper.find('button.loggIn').exists()).toBe(true)
    expect(wrapper.find('div.v-dialog__container').exists()).toBe(true)
  })
  it('if user not logged in, default theme must be dark', async function() {
    const wrapper = setUpComponent(Defaults)
    const BtnToggleTheme = wrapper.find('button.toggleTheme')

    expect(wrapper.find('header.theme--dark').exists()).toBe(true)

    BtnToggleTheme.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('header.theme--light').exists()).toBe(true)

    BtnToggleTheme.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('header.theme--dark').exists()).toBe(true)
  })
})

// admin theme
