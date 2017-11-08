<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
        <h2 class="subtitle">
          {{ subtitle }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SimplusHero',
  props: {
    title: String,
    subtitle: String,
  },
};
</script>

<style lang="scss">
@import '~@/themes/variables';

.hero {
  @each $name, $pair in $colors {
    $color: nth($pair, 1);
    $color-invert: nth($pair, 2);

    &.is-#{$name} {
      background-color: $color;

      .title {
        color: $color-invert;
      }
    }
  }
}
</style>
