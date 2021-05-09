import { State } from '@/store'
import { ActionContext } from 'vuex'

export async function updateLoadStatus (
  context: ActionContext<State, State>,
  value: boolean
): Promise<boolean> {
  context.commit('updateLoadStatus', value)
  return value
}
