import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/_userSlug/my_repositories/create'

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
      name: '',
      about: '',
      cite: '',
      gitHub: '',
      language: '',
      technology: '',
      isPublic: true,
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
        ],
        about: [
          (v) =>
            v.length <= 200 || 'Description must be less than 200 characters'
        ]
      }
    })

    wrapper.vm.language = wrapper.vm.languages.JavaScript.name
    wrapper.vm.technology = wrapper.vm.technologies[0]

    wrapper
      .find('.Card:nth-child(1) .v-input:nth-child(1) input')
      .setValue('New')
    wrapper
      .find('.Card:nth-child(1) .v-input:nth-child(2) input')
      .setValue('https://test.site')
    wrapper
      .find('.Card:nth-child(1) .v-input:nth-child(3) input')
      .setValue('https://github.com/SergeyGuliy/vue-crib')
    wrapper.find('textarea').setValue('About text')

    expect(wrapper.vm.name).toBe('New')
    expect(wrapper.vm.about).toBe('About text')
    expect(wrapper.vm.cite).toBe('https://test.site')
    expect(wrapper.vm.language).toBe('JavaScript')
    expect(wrapper.vm.technology).toBe('Vue')

    wrapper.find('.headerButton').trigger('click')
    wrapper.vm.save()
    await wrapper.vm.$nextTick()
  })
})
