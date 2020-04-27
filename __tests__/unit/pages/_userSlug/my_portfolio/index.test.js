import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/_userSlug/my_portfolio/index'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent)

    expect(wrapper.find('#PortfolioList > .v-card:nth-child(1)').exists()).toBe(
      true
    )
    expect(wrapper.find('#PortfolioList > .v-card:nth-child(2)').exists()).toBe(
      true
    )

    expect(
      wrapper.find('#PortfolioList > .v-card:nth-child(1) .btn_rm').exists()
    ).toBe(true)
    expect(
      wrapper.find('#PortfolioList > .v-card:nth-child(2) .btn_rm').exists()
    ).toBe(true)

    wrapper
      .find('#PortfolioList > .v-card:nth-child(1) .btn_rm')
      .trigger('click')
    wrapper
      .find('#PortfolioList > .v-card:nth-child(2) .btn_rm')
      .trigger('click')

    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('#PortfolioList > .v-card:nth-child(1) .btn_rm').exists()
    ).toBe(false)
    expect(
      wrapper.find('#PortfolioList > .v-card:nth-child(2) .btn_rm').exists()
    ).toBe(false)
  })
})
