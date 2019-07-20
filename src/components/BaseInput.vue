<template>
  <FieldContainer class="base-input" v-bind="$props">
    <input
      id="name"
      class="input"
      v-bind="$attrs"
      :value="value"
      :name="name"
      v-on="listeners"
    />
  </FieldContainer>
</template>

<script lang="ts">
import Vue from 'vue';
import FieldContainer, { props } from '@/components/FieldContainer.vue';

export default Vue.extend({
  name: 'BaseInput',
  components: {
    FieldContainer,
  },
  inheritAttrs: false,
  props: {
    ...props,
  },
  computed: {
    listeners(): any {
      return {
        ...this.$listeners,
        input: this.update,
      };
    },
  },
  methods: {
    update(event: HTMLInputEvent) {
      this.$emit('input', event.target.value);
    },
  },
});
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
