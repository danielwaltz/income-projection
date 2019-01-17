<template>
  <div class="field">
    <label v-if="label" :for="name" class="label">{{ label }}</label>
    <input
      v-if="type !== 'select'"
      :id="name"
      :type="type"
      :value="value"
      class="input"
      @input="$emit('input', $event.target.value)"
    />
    <select
      v-else
      id="name"
      :value="value"
      class="input"
      @input="$emit('input', $event.target.value)"
    >
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.label {
  display: block;
  font-style: italic;
  margin-bottom: 0.1rem;
  font-size: 0.8rem;
}

.input {
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
