<template>
  <nav class="panel">
    <p class="panel-heading has-text-weight-semibold">{{ title }}</p>
    <div class="panel-block">
      <slot></slot>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
@import '~@/themes/variables';

.panel {
  .panel-block {
    background-color: $white;
  }

  .panel-heading {
    background-color: $primary;
    color: $primary-invert;
  }
}
</style>
