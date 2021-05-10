<template>
  <header class="ui-header">
    <router-link class="logo" to="/">
      <Pangol />
    </router-link>
    <input
      type="text"
      class="search"
      v-model="search"
      placeholder="Search"
      v-if="showSearch"
    />
    <router-link class="button" to="/history" v-if="showButton"
      >View History</router-link
    >
    <div class="chart-buttons" v-if="!showSearch">
      <router-link class="button" :to="{name: 'History', query: { unit: 'day', units: 1 }}">1 Days</router-link>
      <router-link class="button" :to="{name: 'History', query: { unit: 'day', units: 7 }}">7 Days</router-link>
      <router-link class="button" :to="{name: 'History', query: { unit: 'month', units: 1 }}">1 Month</router-link>
      <router-link class="button" :to="{name: 'History', query: { unit: 'month', units: 3 }}">3 Months</router-link>
    </div>
    <router-link to="/">
      <h1>Excambio</h1>
    </router-link>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Pangol from '@/components/brand/Pangol.vue'
import { useStore } from 'vuex'
import { key } from '@/store'

@Options({
  components: {
    Pangol
  }
})
export default class UiHeader extends Vue {
  private store = useStore(key);

  public set search (term: string) {
    this.store.dispatch('setSearchTerm', term)
  }

  public get search () {
    return this.store.state.search
  }

  public get showButton () {
    return this.$route.name !== 'History' && this.store.state.selected.length
  }

  public get showSearch () {
    return this.$route.name === 'Home'
  }
}
</script>

<style scoped lang="scss">
.ui-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  padding: 0.5rem;
  background: #ffffff47;
  backdrop-filter: blur(5px);

  h1 {
    margin: 0;
    text-transform: uppercase;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .search {
    flex: 1;
    margin: 0 0.5rem;
    font-size: 2rem;
    border: none;
    background: none;
  }

  .chart-buttons {
    flex: 1;
    text-align: center;
  }
}
</style>
