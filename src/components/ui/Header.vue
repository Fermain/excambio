<template>
  <header class="ui-header">
    <router-link class="logo" to="/">
      <Pangol />
    </router-link>
    <router-link to="/">
      <h1>Excambio</h1>
    </router-link>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Pangol from '@/components/brand/Pangol.vue'

@Options({
  components: {
    Pangol
  }
})
export default class UiHeader extends Vue {}
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
}
</style>
