<template>
  <div id="app">
    <sp-hero
      class="is-primary"
      title="Simplus"
      subtitle="Cadastro de produtos">
    </sp-hero>
    <section class="section">
      <sp-composition
        v-for="(composition, index) in compositions"
        :key="index"
        :id="index"
        :title="composition.title"
        :items="composition.items">
      </sp-composition>
      <sp-button class="is-warning is-pulled-right" icon="fa-plus" @click="newComposition()">Incluir</sp-button>
    </section>
  </div>
</template>

<script>
import SpHero from './components/Hero';
import SpButton from './components/Button';
import SpComposition from './components/Composition';

export default {
  components: {
    SpHero,
    SpButton,
    SpComposition,
  },
  computed: {
    compositions() {
      return this.$store.state.compositions;
    },
  },
  methods: {
    newComposition() {
      this.$store.commit('addComposition', {
        title: `Composição logística ${this.compositions.length + 1}`,
        items: [{ dun: null, pack: null, amount: null, children: [] }],
      });
    },
  }
};
</script>

<style lang="scss">
@import '../node_modules/bulma/sass/utilities/functions';
@import '~@/themes/variables';
@import '../node_modules/bulma/bulma';
</style>
