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
          gtin: '111222333444555',
          unit: 'CAIXA',
          amount: 1,
          children: [
            { gtin: '12345678', unit: 'PACK', amount: 1 },
            {
              gtin: '789607130086',
              unit: 'UNIDADE',
              amount: 1,
              children: [
                { gtin: '789607130086', unit: 'UNIDADE', amount: 1 },
                { gtin: '789607130086', unit: 'UNIDADE', amount: 1 },
              ]
            },
          ],
        }],
      }, {
        title: 'Composição logística 2',
        items: [
          { gtin: '111222333444555', unit: 'CAIXA', amount: 1 },
          { gtin: '12345678', unit: 'PACK', amount: 1 },
          { gtin: '789607130086', unit: 'UNIDADE', amount: 1 },
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
