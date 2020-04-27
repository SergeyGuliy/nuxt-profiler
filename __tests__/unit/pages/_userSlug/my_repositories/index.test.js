import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/_userSlug/my_repositories/index'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent)
    wrapper.setData({
      allRepositories: {
        rep1: {
          name: 'rep1',
          creatorId: 'user1',
          creatorName: 'sergey1',
          language: 'JS',
          technology: 'Vue',
          isPublic: true
        },
        rep2: {
          name: 'rep2',
          creatorId: 'user1',
          creatorName: 'sergey1',
          language: 'JS',
          technology: 'Vue',
          isPublic: true
        },
        rep3: {
          name: 'rep3',
          creatorId: 'user1',
          creatorName: 'sergey1',
          language: 'JS',
          technology: 'Vue',
          isPublic: false
        }
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('tbody > tr:nth-child(1)').exists()).toBe(true)

    wrapper
      .find('tbody > tr:nth-child(1) > td:nth-child(5) > button.btn_rm')
      .trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('tbody > tr:nth-child(1)').exists()).toBe(false)
  })
})
