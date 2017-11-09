<template>
  <div class="field" :class="{ 'is-horizontal': !!title }">
    <div class="field-label is-small" v-if="title">
      <label class="label">{{ title }}</label>
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
    title: String,
  },
};
</script>
