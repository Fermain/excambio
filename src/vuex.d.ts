import { Store } from 'vuex'
import { CurrencyNames, LatestRates } from './models'

declare module '@vue/runtime-core' {
  interface State {
    state: {
      names: CurrencyNames;
      latest: LatestRates;
      loading: boolean;
    };
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
