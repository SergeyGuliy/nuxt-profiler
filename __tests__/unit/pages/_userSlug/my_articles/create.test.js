import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/_userSlug/my_articles/create'

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
    wrapper.find('textarea').setValue('About text')
    expect(wrapper.vm.formIsValid).toBe(true)
    await wrapper.vm.$nextTick()

    wrapper.find('.headerButton').trigger('click')
    await wrapper.vm.$nextTick()
  })
})
