<template>
  <sp-field :title="title" :required="required">
    <div class="field">
      <p class="control">
        <div class="select is-small is-fullwidth">
          <select :value="value" @input="$emit('input', $event.target.value)">
            <option disabled>{{ placeholder }}</option>
            <option v-for="option in options">{{ option }}</option>
          </select>
        </div>
      </p>
    </div>
  </sp-field>
</template>

<script>
import SpField from './Field';

export default {
  name: 'SpSelect',
  components: {
    SpField,
  },
  props: {
    value: [String, Number],
    options: Array,
    title: String,
    placeholder: String,
    required: Boolean,
    firstDefault: Boolean,
  },
  created() {
    debugger;
    if (!this.value && this.firstDefault) {
      this.$emit('input', this.options[0]);
    }
  },
};
</script>
