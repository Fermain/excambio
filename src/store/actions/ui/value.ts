import { State } from '@/store'
import { ActionContext } from 'vuex'

export async function setConversionValue (
  context: ActionContext<State, State>,
  value = 1
): Promise<number> {
  context.commit('setConversionValue', value)
  context.dispatch('updateSearchParams')
  return value
}
