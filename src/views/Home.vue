<template>
  <div class="home">
    <exchange-list />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ExchangeList from '@/components/exchange/List.vue'

@Options({
  components: {
    ExchangeList
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
