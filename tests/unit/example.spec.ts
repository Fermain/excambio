import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.exists()).toBe(true)
  })
})
