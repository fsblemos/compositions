<template>
  <div class="field" :class="{ 'is-horizontal': !!title }">
    <div class="field-label is-small" v-if="title">
      <label class="label is-small">{{ title }}</label>
    </div>
    <div class="field-body">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpSelect',
  props: {
    value: [String, Number],
    options: Array,
    title: String,
    placeholder: String,
  },
};
</script>
