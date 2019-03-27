<template>
  <label class="field-container">
    <span v-if="label" class="label">{{ label }}</span>
    <slot />
  </label>
</template>

<script>
export default {
  name: 'FieldContainer',
  props: {
    name: {
      type: String,
      default: '',
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
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
</style>
