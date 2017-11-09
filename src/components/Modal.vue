<template>
  <div class="modal is-primary" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpModal',
  props: {
    title: String,
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/themes/variables';

.modal {
  @each $name, $pair in $colors {
    $color: nth($pair, 1);
    $color-invert: nth($pair, 2);

    &.is-#{$name} {
      .modal-card-head {
        background-color: $color;

        .modal-card-title {
          color: $color-invert;
        }
      }
    }
  }

  .modal-card-foot {
    justify-content: flex-end;
  }
}
</style>
