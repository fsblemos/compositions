<template>
  <sp-field :title="title">
    <div class="field">
      <p class="control">
        <input
          class="input is-small"
          :placeholder="placeholder"
          :type="type"
          :value="value"
          @input="$emit('input', $event.target.value)">
      </p>
    </div>
  </sp-field>
  <!-- <div class="field" :class="{ 'is-horizontal': !!title }">
    <div class="field-label is-small" v-if="title">
      <label class="label">{{ title }}</label>
    </div>
    <div class="field-body">

    </div>
  </div> -->
</template>

<script>
import SpField from './Field';

export default {
  name: 'SpInput',
  components: {
    SpField,
  },
  props: {
    value: [String, Number],
    placeholder: String,
    type: String,
    title: String,
  },
};
</script>
