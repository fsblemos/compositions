<template>
  <a class="button">
    <span class="icon is-small">
      <i class="fa" :class="[icon]"></i>
    </span>
  </a>
</template>

<script>
export default {
  name:'SpButton',
  props: {
    icon: String,
  },
};
</script>
