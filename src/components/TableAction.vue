<template>
  <simplus-button
    class="table-action is-small"
    :class="[`is-${currentType.color}`]"
    :icon="currentType.icon">
  </simplus-button>
</template>

<script>
import SimplusButton from './Button';

const Types = [
  { key: 'insert', icon: 'fa-link', color: 'warning' },
  { key: 'edit', icon: 'fa-pencil', color: 'warning' },
  { key: 'remove', icon: 'fa-trash', color: 'danger' },
];

export default {
  name: 'TableAction',
  components: {
    SimplusButton,
  },
  props: {
    type: {
      type: String,
      validator(value) {
        return Object.values(Types).map(type => type.key).includes(value);
      },
    },
  },
  computed: {
    currentType() {
      return Object.values(Types).find(type => type.key === this.type);
    },
  },
};
</script>

<style lang="scss">
.table-action {
  &:not(:last-child) {
    margin-right: .25em;
  }
}
</style>
