<template>
  <footer class="ui-footer">
    <a class="logo" href="/">
      <Pangol />
    </a>
    <nav>
      <router-link to="/terms">Terms of Use</router-link>
    </nav>
  </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Pangol from '@/components/brand/Pangol.vue'

@Options({
  components: {
    Pangol
  }
})
export default class UiFooter extends Vue {}
</script>

<style scoped lang="scss">
.ui-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 0.5rem;

  filter: invert(1);
  background: #ece9e7;

  nav {
    a {
      margin: 0.25rem;
    }
  }

  a {
    color: inherit;
  }
}
</style>
