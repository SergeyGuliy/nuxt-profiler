import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/articles/index'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent)
    wrapper.setData({
      allArticles: {
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

    expect(wrapper.find('tbody > tr:nth-child(3)').exists()).toBe(false)

    expect(
      wrapper
        .find('tbody > tr:nth-child(1) > td:nth-child(5)')
        .contains('button.btn_rm')
    ).toBe(true)
    expect(
      wrapper
        .find('tbody > tr:nth-child(2) > td:nth-child(5)')
        .contains('button.btn_add')
    ).toBe(true)

    wrapper
      .find('tbody > tr:nth-child(1) > td:nth-child(5) > button.btn_rm')
      .trigger('click')
    await wrapper.vm.$nextTick()

    expect(
      wrapper
        .find('tbody > tr:nth-child(1) > td:nth-child(5)')
        .contains('button.btn_add')
    ).toBe(true)
    await wrapper.vm.$nextTick()

    wrapper
      .find('tbody > tr:nth-child(2) > td:nth-child(5) > button.btn_add')
      .trigger('click')
    await wrapper.vm.$nextTick()

    expect(
      wrapper
        .find('tbody > tr:nth-child(2) > td:nth-child(5)')
        .contains('button.btn_rm')
    ).toBe(true)
  })
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent)
    wrapper.vm.$store.dispatch('logOut')
    wrapper.setData({
      allArticles: {
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
        }
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.btn_add').exists()).toBe(false)
    expect(wrapper.find('.btn_rm').exists()).toBe(false)
  })
})
