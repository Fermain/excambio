import { Currency } from '@/models'
import { State } from '@/store'
import { ActionContext } from 'vuex'

export async function pushSelected (
  context: ActionContext<State, State>,
  value: Currency
): Promise<Currency[]> {
  const match = context.state.selected.find(
    currency => currency.code === value.code
  )
  if (!match) {
    context.commit('updateSelected', [...context.state.selected, value])
    context.dispatch('updateSearchParams')
  }

  return context.state.selected
}

export async function removeSelected (
  context: ActionContext<State, State>,
  value: Currency
): Promise<Currency[]> {
  context.commit(
    'updateSelected',
    context.state.selected.filter(currency => currency.code !== value.code)
  )
  context.dispatch('updateSearchParams')
  return context.state.selected
}

export async function toggleSelected (
  context: ActionContext<State, State>,
  value: Currency
): Promise<Currency[]> {
  const match = context.state.selected.find(
    currency => currency.code === value.code
  )

  if (match) {
    context.dispatch('removeSelected', value)
  } else {
    context.dispatch('pushSelected', value)
  }
  return context.state.selected
}
