<template>
  <sp-field :title="title" :required="required">
    <div class="field">
      <p class="control">
        <input
          class="input is-small"
          :placeholder="placeholder"
          :required="required"
          :type="type"
          :value="value"
          @input="$emit('input', $event.target.value)">
      </p>
    </div>
  </sp-field>
</template>

<script>
import SpField from './Field';

export default {
  name: 'SpInput',
  components: {
    SpField,
  },
  props: {
    placeholder: String,
    required: Boolean,
    title: String,
    type: String,
    value: [String, Number],
  },
};
</script>
