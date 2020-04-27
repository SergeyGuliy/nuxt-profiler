import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/repositories/_id/index'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent, {
      id: 'rep1'
    })
    wrapper.setData({
      data: {
        name: 'rep1',
        creatorId: 'user1',
        creatorName: 'sergey1',
        language: 'JavaScript',
        technology: 'Vue',
        isPublic: true,
        cite: 'https://vue-test-utils.vuejs.org/',
        gitHub: 'https://github.com/SergeyGuliy/vue-crib',
        about: 'About text'
      },
      gitApiInfo: {
        watchers_count: 1,
        subscribers_count: 2,
        forks: 3,
        language: 'JS',
        description: 'GitHub description',
        owner: {
          html_url: 'https://github.com/SergeyGuliy/',
          login: 'Sergey'
        },
        html_url: 'https://github.com/SergeyGuliy/vue-crib'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.btn_rm').exists()).toBe(true)
    expect(wrapper.find('.btn_add').exists()).toBe(false)

    wrapper.find('.btn_rm').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.btn_rm').exists()).toBe(false)
    expect(wrapper.find('.btn_add').exists()).toBe(true)

    expect(wrapper.text().includes('Public')).toBe(true)
    expect(wrapper.text().includes('rep1')).toBe(true)
    expect(wrapper.text().includes('JavaScript')).toBe(true)
    expect(wrapper.text().includes('Vue')).toBe(true)
    expect(wrapper.text().includes('Sergey')).toBe(true)
    expect(wrapper.text().includes('github.com/SergeyGuliy/')).toBe(true)
    expect(wrapper.text().includes('vue-test-utils.vuejs.org/')).toBe(true)
    expect(wrapper.text().includes('github.com/SergeyGuliy/vue-crib ')).toBe(
      true
    )
  })

  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent, {
      id: 'art4'
    })
    await wrapper.vm.$nextTick()
    wrapper.setData({
      data: {
        name: 'rep1',
        creatorId: 'user1',
        creatorName: 'sergey1',
        language: '',
        technology: '',
        isPublic: false,
        cite: '',
        gitHub: 'https://github.com/SergeyGuliy/vue-crib',
        about: ''
      },
      gitApiInfo: {
        watchers_count: 1,
        subscribers_count: 2,
        forks: 3,
        language: 'JS',
        description: 'GitHub description',
        owner: {
          html_url: 'https://github.com/SergeyGuliy/',
          login: 'Sergey'
        },
        html_url: 'https://SergeyGuliy/vue-crib'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.btn_rm').exists()).toBe(false)
    expect(wrapper.find('.btn_add').exists()).toBe(false)

    expect(wrapper.text().includes('Private')).toBe(true)

    expect(
      wrapper
        .find(
          '.v-slide-group__content span:nth-child(1) .v-chip__content .v-chip__content'
        )
        .text()
    ).toBe('1')
    expect(
      wrapper
        .find(
          '.v-slide-group__content span:nth-child(2) .v-chip__content .v-chip__content'
        )
        .text()
    ).toBe('2')
    expect(
      wrapper
        .find(
          '.v-slide-group__content span:nth-child(3) .v-chip__content .v-chip__content'
        )
        .text()
    ).toBe('3')

    expect(wrapper.text().includes('JS')).toBe(true)
    expect(wrapper.text().includes('GitHub description')).toBe(true)
    expect(wrapper.text().includes('SergeyGuliy/vue-crib')).toBe(true)
    expect(wrapper.text().includes('github.com/SergeyGuliy/vue-crib')).toBe(true)
  })
})
