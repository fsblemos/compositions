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
    firstDefault: Boolean,
    options: Array,
    placeholder: String,
    required: Boolean,
    title: String,
    value: [String, Number],
  },
  created() {
    debugger;
    if (!this.value && this.firstDefault) {
      this.$emit('input', this.options[0]);
    }
  },
};
</script>
