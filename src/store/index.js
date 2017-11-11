import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const flatten = (items, level = 0, parent = null) =>
  items.reduce((prev, cur) => {
    const child = { ...cur, level, parent };

    if (child.children) {
      delete child.children
    }

    return cur.children
      ? [...prev, child, ...flatten(cur.children, level + 1, cur.dun)]
      : prev.concat(child);
    }, []);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    compositions: [],
    counter: 0,
  },
  mutations: {
    increment(state, amount = 1) {
      state.counter++;
    },

    removeComposition(state, index) {
      state.compositions.splice(index, 1);
    },

    addComposition(state, composition) {
      if (!composition.items || !composition.items.length) {
        composition.items = [{}];
      }

      state.compositions.push({ ...composition, items: flatten(composition.items)});

      this.commit('increment');
    },

    addCompositions(state, compositions) {
      compositions.forEach(composition => {
        this.commit('addComposition', composition);
      });
    },

    setItem(state, { index, item }) {
      const composition = state.compositions[index];
      const currentItem = composition.items.find(i => i.dun === item.dun);

      composition.items.splice(composition.items.indexOf(currentItem), 1, item);
    },

    removeItem(state, { index, dun }) {
      const composition = state.compositions[index];
      const remove = (dun) => {
        composition.items.forEach(item => {
          if ((item.parent && item.parent === dun) || item.dun === dun) {
            composition.items.splice(composition.items.indexOf(item), 1);
            remove(item.dun);
          }
        });
      };

      remove(dun);
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

    addParentItem(state, { index, item, parent }) {
      const composition = state.compositions[index];

      if (composition.items.find(i => i.dun === parent.dun)) {
        throw new Error('Já existe item com este ID');
      }

      const currentItem = composition.items.find(i => i.dun === item.dun);
      const currentParent = composition.items.find(i => i.dun === item.parent);

      const updateLevel = (parent) => {
        composition.items.forEach(item => {
          if (item.parent === parent) {
            item.level = (item.level || 0) + 1;
            updateLevel(item.dun);
          }
        });
      };

      if (currentParent && currentParent.dun) {
        parent.parent = currentParent.dun;
        parent.level = (currentParent.level || 0) + 1;
      }

      this.commit('addItem', { index, item: parent });

      currentItem.parent = parent.dun;

      updateLevel(parent.dun);
    },
  },
  getters: {
    items: (state) => (index) =>
      state.compositions[index].items.sort((a, b) => {
        if (!a.parent && b.parent) {
          return -1;
        } else if (!b.parent && a.parent) {
          return 1;
        } else {
          return a.level - b.level;
        }
      }),
  },
});
