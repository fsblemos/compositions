<template>
  <simplus-panel :title="title">
    <simplus-table :columns="columns" :rows="flattedItems">
      <template slot-scope="props">
        <simplus-table-row
          :row="props.row"
          :level="props.row.level"
          :actions="getActions(props.row)">
        </simplus-table-row>
      </template>
    </simplus-table>
  </simplus-panel>
</template>

<script>
import SimplusPanel from '../components/Panel';
import SimplusTable from '../components/Table';
import SimplusTableRow from '../components/TableRow';

export default {
  name: 'Composition',
  components: {
    SimplusPanel,
    SimplusTable,
    SimplusTableRow,
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
      const flatten = (items, level) =>
        items.reduce((prev, cur) => {
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
