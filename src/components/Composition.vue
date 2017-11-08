<template>
  <sp-panel :title="title">
    <sp-table :columns="columns" :rows="flattedItems">
      <template slot-scope="props">
        <sp-table-row
          :row="props.row"
          :level="props.row.level"
          :actions="getActions(props.row)">
        </sp-table-row>
      </template>
    </sp-table>
  </sp-panel>
</template>

<script>
import SpPanel from '../components/Panel';
import SpTable from '../components/Table';
import SpTableRow from '../components/TableRow';

export default {
  name: 'SpComposition',
  components: {
    SpPanel,
    SpTable,
    SpTableRow,
  },
  props: {
    title: String,
    items: Array,
  },
  data() {
    return {
      columns: [
        { index: 'gtin', title: 'GTIN' },
        { index: 'unit', title: 'Unidade da embalagem' },
        { index: 'amount', title: 'Quantidade da embalagem' },
      ],
    };
  },
  computed: {
    flattedItems() {
      const flatten = (items, level) => items.reduce((prev, cur) => {
        const item = prev.concat({ ...cur, level });
        return cur.children ? [...prev, ...item, ...flatten(cur.children, level + 1)] : item;
      }, []);

      return flatten(this.items, 0);
    },
  },
  methods: {
    getActions(row) {
      const defaultActions = ['edit', 'insert'];
      return row.children ? [...defaultActions, 'remove'] : defaultActions;
    },
  },
};
</script>
