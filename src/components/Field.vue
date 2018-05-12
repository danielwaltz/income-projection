<template>
  <div class="field">
    <label :for="name">{{prettyName}}</label>
    <input
      :type="type"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    type: String,
    name: String,
    prettyName: String,
    value: [String, Number],
  },
};
</script>
