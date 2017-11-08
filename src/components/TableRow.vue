<template>
  <tr>
    <td v-for="(column, index) in $parent.columns" :key="index">
      <div class="level" :style="{ marginLeft: index === 0 && `${level}rem` }">
        {{ row[column.index] }}
      </div>
    </td>
    <td class="has-text-right">
      <simplus-table-action
        v-for="action in actions"
        :key="action"
        :type="action">
      </simplus-table-action>
    </td>
  </tr>
</template>

<script>
import SimplusTableAction from './TableAction';

export default {
  components: {
    SimplusTableAction,
  },
  props: {
    row: Object,
    actions: Array,
    level: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isParent() {
      return this.row.children && this.row.children.lenght;
    },
  },
};
</script>
