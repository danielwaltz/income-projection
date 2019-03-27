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

<script>
import FieldContainer from '@/components/FieldContainer';

export default {
  name: 'BaseInput',
  components: {
    FieldContainer,
  },
  inheritAttrs: false,
  props: {
    ...FieldContainer.props,
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.update,
      };
    },
  },
  methods: {
    update(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
