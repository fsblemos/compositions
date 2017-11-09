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
        :title="composition.title"
        :items="composition.items">
      </sp-composition>
      <sp-button class="is-warning is-pulled-right" icon="fa-plus">Incluir</sp-button>
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
  data() {
    return {
      compositions: [{
        title: 'Composição logística 1',
        items: [{
          dun: '111222333444555',
          pack: 'CAIXA',
          amount: 1,
          children: [
            { dun: '12345678', pack: 'PACK', amount: 1 },
            {
              dun: '789607130086',
              pack: 'UNIDADE',
              amount: 1,
              children: [
                { dun: '789607130086', pack: 'UNIDADE', amount: 1 },
                { dun: '789607130086', pack: 'UNIDADE', amount: 1 },
              ]
            },
          ],
        }],
      }, {
        title: 'Composição logística 2',
        items: [
          { dun: '111222333444555', pack: 'CAIXA', amount: 1 },
          { dun: '12345678', pack: 'PACK', amount: 1 },
          { dun: '789607130086', pack: 'UNIDADE', amount: 1 },
        ]
      }],
    };
  },
};
</script>

<style lang="scss">
@import '../node_modules/bulma/sass/utilities/functions';
@import '~@/themes/variables';
@import '../node_modules/bulma/bulma';
</style>
