<template>
  <div class="field">
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      :id="name"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    type: String,
    name: String,
    label: String,
    value: [String, Number],
  },
};
</script>
