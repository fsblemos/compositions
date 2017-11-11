<template>
  <tr>
    <td v-for="(column, index) in $parent.columns" :key="index">
      <div class="level" :style="{ marginLeft: index === 0 && `${level}rem` }">
        {{ row[column.index] }}
      </div>
    </td>
    <td class="has-text-right">
      <sp-table-action
        v-for="action in actions"
        @click="action => $emit('action', action, row)"
        :key="action"
        :type="action">
      </sp-table-action>
    </td>
  </tr>
</template>

<script>
import SpTableAction from './TableAction';

export default {
  name: 'SpTableRow',
  components: {
    SpTableAction,
  },
  props: {
    actions: Array,
    row: Object,
    level: {
      type: Number,
      default: 0,
    },
  },
};
</script>
