import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { store } from '@/store'

test('Loads list with default data', async () => {
  const wrapper = mount(Home, {
    global: {
      mocks: {
        store
      }
    }
  })

  // Check if the wrapper has child component
  expect(wrapper.getComponent('table.exchange-list').html()).toBeTruthy()
  // Check that the table has at least one row
  expect(wrapper.findAll('tbody > tr').length).toBeGreaterThanOrEqual(1)
})
