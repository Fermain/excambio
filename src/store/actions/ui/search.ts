import { State } from '@/store'
import { ActionContext } from 'vuex'

export async function setSearchTerm (
  context: ActionContext<State, State>,
  term = ''
): Promise<string> {
  context.commit('setSearchTerm', term)
  context.dispatch('updateSearchParams')
  return term
}
