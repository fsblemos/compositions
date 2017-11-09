<template>
  <button class="button" :type="type" v-on="$listeners">
    <span class="icon is-small" v-if="icon">
      <i class="fa" :class="[icon]"></i>
    </span>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name:'SpButton',
  props: {
    icon: String,
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>
