<template>
  <div id="app">
    <simplus-hero
      class="is-primary"
      title="Simplus"
      subtitle="Cadastro de produtos">
    </simplus-hero>
    <section class="section">
      <composition
        v-for="composition in compositions"
        :key="composition.id"
        :title="composition.title"
        :items="composition.items">
      </composition>
      <simplus-button class="is-warning is-pulled-right" icon="fa-plus"></simplus-button>
    </section>
  </div>
</template>

<script>
import SimplusHero from './components/Hero';
import SimplusButton from './components/Button';
import Composition from './views/Composition';

export default {
  components: {
    SimplusHero,
    SimplusButton,
    Composition,
  },
  data() {
    return {
      compositions: [{
        id: 1,
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
        },
      ]}, {
        id: 2,
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
