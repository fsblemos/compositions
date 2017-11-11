import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
              { dun: '789607130086123', pack: 'UNIDADE', amount: 1 },
              { dun: '78960713008645', pack: 'UNIDADE', amount: 1 },
            ]
          },
        ],
      }],
    }, {
      title: 'Composição logística 2',
      items: [
        { dun: '111222333444555123', pack: 'CAIXA', amount: 1 },
        { dun: '12345678123', pack: 'PACK', amount: 1 },
        { dun: '78960713008612312', pack: 'UNIDADE', amount: 1 },
      ]
    }],
  },
  mutations: {
    addComposition(state, composition) {
      state.compositions.push(composition);
    },
    setItem(state, { index, item }) {
      const items = this.getters.flattedItems(index);
      const currentItem = items.find(i => i.dun === item.dun);

      if (currentItem) {
        Object.keys(item).forEach((key) => {
          currentItem[key] = item[key];
        });
      } else {
        this.commit('addItem', { index, item });
      }
    },
    addItem(state, { index, item }) {
      const composition = state.compositions[index];

      if (composition) {
        if (composition.items.length === 1 && !composition.items[0].dun) {
          composition.items = [];
        }

        composition.items.push(item);
      }
    },
  },
  getters: {
    flattedItems: (state) => (index) => {
      const flatten = (items, level) => items.reduce((prev, cur) => {
        const item = prev.concat({ ...cur, level });
        return cur.children ? [...prev, ...item, ...flatten(cur.children, level + 1)] : item;
      }, []);

      return flatten(state.compositions[index].items, 0);
    },
  },
});
