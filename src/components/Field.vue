<template>
  <div class="field" :class="{ 'is-horizontal': !!title }">
    <div class="field-label is-small" v-if="title">
      <label class="label" :class="{ 'is-required': required }">{{ title }}</label>
    </div>
    <div class="field-body">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpField',
  props: {
    required: Boolean,
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.label {
  position: relative;

  &.is-required {
    &::after {
      content: '*';
      color: red;
      position: absolute;
      right: -10px;
    }
  }
}
</style>
