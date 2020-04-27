import { setUpComponent } from '~/_fake_test_vue_setup'

import testComponent from '~/pages/articles/_id/index'

describe('default.vue', () => {
  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent, {
      id: 'art1'
    })
    wrapper.setData({
      data: {
        name: 'art1',
        creatorId: 'user1',
        creatorName: 'sergey',
        language: 'HTML',
        technology: 'Materialize',
        isPublic: true,
        cite: 'https://vue-test-utils.vuejs.org/',
        about: 'About text'
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
    expect(wrapper.text().includes('art1')).toBe(true)
    expect(wrapper.text().includes('HTML')).toBe(true)
    expect(wrapper.text().includes('Materialize')).toBe(true)
    expect(wrapper.text().includes('sergey')).toBe(true)
    expect(wrapper.text().includes('vue-test-utils.vuejs.org/')).toBe(true)
  })

  it('if user logged in, and his theme is dark, try to toggle theme', async function() {
    const wrapper = setUpComponent(testComponent, {
      id: 'art4'
    })
    wrapper.setData({
      data: {
        name: 'art4',
        creatorId: 'user1',
        creatorName: 'sergey',
        language: 'JS',
        technology: 'Vue',
        isPublic: false,
        cite: 'https://vue-test-utils.vuejs.org/',
        about: 'About text'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.btn_rm').exists()).toBe(false)
    expect(wrapper.find('.btn_add').exists()).toBe(false)

    expect(wrapper.text().includes('Private')).toBe(true)
    expect(wrapper.text().includes('art4')).toBe(true)
    expect(wrapper.text().includes('JS')).toBe(true)
    expect(wrapper.text().includes('Vue')).toBe(true)
    expect(wrapper.text().includes('About text')).toBe(true)
    expect(wrapper.text().includes('sergey')).toBe(true)
    expect(wrapper.text().includes('vue-test-utils.vuejs.org/')).toBe(true)
  })
})
