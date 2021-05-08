<template>
  <header class="ui-header">
    <router-link class="logo" to="/">
      <Pangol />
    </router-link>
    <input type="text" class="search" v-model="search" placeholder="Search">
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
}
</script>

<style scoped lang="scss">
.ui-header {
  display: flex;
  align-items: center;

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
}
</style>
