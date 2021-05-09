import { Currency } from '@/models'
import router from '@/router'
import { State } from '@/store'
import { ActionContext } from 'vuex'

export async function updateSearchParams (
  context: ActionContext<State, State>
): Promise<void> {
  if (router.currentRoute.value.name) {
    await router.push({
      name: router.currentRoute.value.name,
      query: context.getters.searchParams
    })
  }
}

export async function applyQueryState (
  context: ActionContext<State, State>
): Promise<void> {
  const codes = (router.currentRoute.value.query.c as string)?.split(',')
  const value = Number(router.currentRoute.value.query.v)
  const term = router.currentRoute.value.query.q as string

  if (codes && codes.length) {
    codes
      .map(code => {
        return context.getters.currencyList.find(
          (currency: Currency) => currency.code === code
        )
      })
      .filter(Boolean)
      .forEach(currency => {
        context.dispatch('pushSelected', currency)
      })
  }

  if (value) {
    context.dispatch('setConversionValue', value)
  }

  context.dispatch('setSearchTerm', term)
}
