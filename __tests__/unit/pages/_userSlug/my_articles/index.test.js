import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/_userSlug/my_articles/index'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent)
    wrapper.setData({
      basicList: {
        art1: {
          name: 'art1',
          creatorId: 'user1',
          creatorName: 'sergey1',
          language: 'JS',
          technology: 'Vue',
          isPublic: true
        },
        art2: {
          name: 'art2',
          creatorId: 'user1',
          creatorName: 'sergey1',
          language: 'JS',
          technology: 'Vue',
          isPublic: true
        },
        art3: {
          name: 'art3',
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
