<template>
  <div class="home">
    <exchange-list />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ExchangeList from '@/components/exchange/List.vue'
import ExchangePair from '@/components/exchange/Pair.vue'

@Options({
  components: {
    ExchangeList,
    ExchangePair
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  background: var(--color-dark);
  flex: 1;
  display: flex;
}
</style>
