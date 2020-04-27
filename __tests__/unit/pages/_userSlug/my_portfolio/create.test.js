import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/_userSlug/my_portfolio/create'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent)
    wrapper.setData({
      name: '',
      cite: '',
      gitHub: '',
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 25 || 'Name must be less than 25 characters'
        ],
        cite: [
          (v) => !!v || 'Link is required',
          (v) => /http.+/.test(v) || 'Link must starts with "http"',
          (v) => v.length <= 200 || 'Link must be less than 200 characters'
        ],
        gitHub: [
          (v) => !!v || 'Link is required',
          (v) =>
            /https:\/\/github.com\/.+/.test(v) ||
            'Link must starts with "https://github.com/"',
          (v) => v.length <= 200 || 'Link must be less than 100 characters'
        ]
      }
    })

    wrapper.find('.Card > .v-input:nth-child(1) input').setValue('New')
    expect(wrapper.vm.formIsValid).toBe(false)

    wrapper
      .find('.Card > .v-input:nth-child(2) input')
      .setValue('https://test.site')
    expect(wrapper.vm.formIsValid).toBe(true)

    wrapper
      .find('.Card > .v-input:nth-child(3) input')
      .setValue('https://github.com/SergeyGuliy/vue-crib')
    expect(wrapper.vm.formIsValid).toBe(true)

    expect(wrapper.vm.name).toBe('New')
    expect(wrapper.vm.cite).toBe('https://test.site')
    expect(wrapper.vm.gitHub).toBe('https://github.com/SergeyGuliy/vue-crib')

    await wrapper.vm.$nextTick()

    wrapper.find('.headerButton').trigger('click')
    await wrapper.vm.$nextTick()
  })
})
