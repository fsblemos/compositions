<template>
  <table class="table is-striped is-hoverable is-narrow is-fullwidth">
    <thead>
      <tr>
        <th v-for="column in columns">{{ column.title }}</th>
        <th class="has-text-right">Ações</th>
      </tr>
    </thead>
    <tbody>
      <slot v-for="(row, index) in rows" :row="row"></slot>
    </tbody>
  </table>
</template>

<script>
import SimplusTableAction from './TableAction';
import SimplusTableRow from './TableRow';

export default {
  name: 'SimplusTable',
  components: {
    SimplusTableAction,
    SimplusTableRow,
  },
  props: {
    columns: Array,
    rows: Array,
    actions: Array,
  },
};
</script>
