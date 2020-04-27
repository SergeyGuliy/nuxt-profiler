import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/repositories/_id/edit'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent)
    wrapper.setData({
      languages: {
        JavaScript: {
          name: 'JavaScript',
          technologies: ['Vue', 'React']
        },
        'HTML & CSS': {
          name: 'HTML & CSS',
          technologies: ['Materialize', 'Bootstrap']
        }
      },
      data: {
        name: 'Old',
        about: 'About text',
        cite: 'https://test.site',
        gitHub: 'https://github.com/SergeyGuliy/vue-crib',
        language: 'JavaScript',
        technology: 'Vue',
        isPublic: true
      },
      oldData: {
        name: 'Old',
        about: 'About text',
        cite: 'https://test.site',
        gitHub: 'https://github.com/SergeyGuliy/vue-crib',
        language: 'JavaScript',
        technology: 'Vue',
        isPublic: true
      },
      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 25 || 'Name must be less than 25 characters'
        ],
        cite: [
          (v) => !!v || 'Link is required',
          (v) => /http.+/.test(v) || 'Link must starts with "http"',
          (v) => v.length <= 200 || 'Link must be less than 100 characters'
        ],
        gitHub: [
          (v) => !!v || 'Link is required',
          (v) =>
            /https:\/\/github.com\/.+/.test(v) ||
            'Link must starts with "https://github.com/"',
          (v) => v.length <= 200 || 'Link must be less than 100 characters'
        ],
        about: [
          (v) =>
            v.length <= 200 || 'Description must be less than 200 characters'
        ]
      }
    })

    expect(wrapper.vm.formIsValid).toBe(false)
    wrapper.vm.data.language = wrapper.vm.languages['HTML & CSS'].name
    wrapper.vm.data.technology = wrapper.vm.technologies[0]

    wrapper
      .find('.Card:nth-child(1) .v-input:nth-child(1) input')
      .setValue('New')
    expect(wrapper.vm.formIsValid).toBe(true)

    wrapper
      .find('.Card:nth-child(1) .v-input:nth-child(2) input')
      .setValue('https://test.site.new')
    wrapper.find('textarea').setValue('About updated')

    expect(wrapper.vm.data.name).toBe('New')
    expect(wrapper.vm.data.about).toBe('About updated')
    expect(wrapper.vm.data.cite).toBe('https://test.site.new')
    expect(wrapper.vm.data.language).toBe('HTML & CSS')
    expect(wrapper.vm.data.technology).toBe('Materialize')
    await wrapper.vm.$nextTick()

    wrapper.find('.headerButton').trigger('click')
    await wrapper.vm.$nextTick()
  })
})
